#!/usr/bin/env bash
# One-time setup of a fresh Oracle Cloud "Always Free" Ampere A1 server (Ubuntu 24.04 or 22.04, Arm)
# for www.99visual.com: Node.js 22, PostgreSQL 17, nginx, HTTPS (Let's Encrypt), pm2, firewall,
# automatic security updates and a nightly database backup.
#
# Run as root on the server:
#   sudo -i
#   EMAIL=you@example.com bash setup-server.sh        (EMAIL may be left out until DNS points here)
#
# Safe to run again: it never overwrites an existing database, password or .env file.
set -euo pipefail

DOMAIN="${DOMAIN:-99visual.com}"            # the site answers on DOMAIN and www.DOMAIN
EMAIL="${EMAIL:-}"                          # for HTTPS certificate notices; only needed once DNS points here
REPO_URL="${REPO_URL:-https://github.com/Sunilkiims/99visual.git}"
BRANCH="${BRANCH:-main}"
[ "$(id -u)" -eq 0 ] || { echo "Run as root: sudo -i, then run this script again."; exit 1; }

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_USER=visual99
APP_DIR=/var/www/99visual
DB_NAME=visual99
DB_USER=visual99
APP_PORT=3100                                # Shilpikala can use 3000 on the same server later
CONF_DIR=/etc/99visual
BACKUP_DIR=/var/backups/99visual
export DEBIAN_FRONTEND=noninteractive

echo "==> System: $(. /etc/os-release && echo "$PRETTY_NAME") on $(uname -m)"
[ "$(uname -m)" = "aarch64" ] || echo "    (not an Arm server; that's fine, everything here also works on x86-64)"

echo "==> System packages"
apt-get update -y
apt-get upgrade -y
apt-get install -y curl git ca-certificates gnupg lsb-release fail2ban nginx certbot python3-certbot-nginx \
  gettext-base dnsutils cron unattended-upgrades iptables-persistent netfilter-persistent

echo "==> Automatic security updates"
cat > /etc/apt/apt.conf.d/20auto-upgrades <<'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
EOF

echo "==> PostgreSQL 17 (from the official PostgreSQL repository, same major version as Neon)"
if ! dpkg -s postgresql-17 >/dev/null 2>&1; then
  install -d /usr/share/postgresql-common/pgdg
  curl -fsSL -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc https://www.postgresql.org/media/keys/ACCC4CF8.asc
  echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" \
    > /etc/apt/sources.list.d/pgdg.list
  apt-get update -y
  apt-get install -y postgresql-17
fi
systemctl enable --now postgresql
# PostgreSQL listens on localhost only (the default). Nothing outside this server can reach it.

echo "==> Node.js 22 and pm2"
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 22 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
command -v pm2 >/dev/null || npm install -g pm2

echo "==> Swap (2 GB safety net for builds)"
if ! swapon --show | grep -q .; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Firewall on the server: allow HTTP and HTTPS"
bash "$HERE/open-ports.sh"
systemctl enable --now fail2ban >/dev/null 2>&1 || true

echo "==> App user and folders"
id "$APP_USER" >/dev/null 2>&1 || adduser --disabled-password --gecos "" "$APP_USER"
mkdir -p "$APP_DIR" "$BACKUP_DIR" "$CONF_DIR"
chown "$APP_USER":"$APP_USER" "$APP_DIR"
chmod 700 "$BACKUP_DIR" "$CONF_DIR"

echo "==> PostgreSQL database and user"
DB_PASSWORD_FILE="$CONF_DIR/db-password"
if [ ! -s "$DB_PASSWORD_FILE" ]; then
  (umask 077; openssl rand -hex 24 > "$DB_PASSWORD_FILE")
fi
DB_PASSWORD="$(cat "$DB_PASSWORD_FILE")"
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1; then
  sudo -u postgres psql -qc "CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD'"
fi
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1; then
  sudo -u postgres psql -qc "CREATE DATABASE $DB_NAME OWNER $DB_USER"
fi

echo "==> Project code"
if [ ! -d "$APP_DIR/.git" ]; then
  if [ -z "$(ls -A "$APP_DIR")" ]; then
    sudo -u "$APP_USER" git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
  else
    echo "    $APP_DIR is not empty and not a git checkout; leaving it as it is."
  fi
else
  echo "    already there ($(sudo -u "$APP_USER" git -C "$APP_DIR" rev-parse --abbrev-ref HEAD))"
fi

echo "==> .env (settings)"
if [ ! -e "$APP_DIR/.env" ]; then
  export DOMAIN DB_USER DB_NAME DB_PASSWORD
  JWT_SECRET="$(openssl rand -hex 32)"
  export JWT_SECRET
  envsubst '${DOMAIN} ${DB_USER} ${DB_NAME} ${DB_PASSWORD} ${JWT_SECRET}' < "$HERE/env.template" > "$APP_DIR/.env"
  chown "$APP_USER":"$APP_USER" "$APP_DIR/.env"
  chmod 600 "$APP_DIR/.env"
  echo "    created $APP_DIR/.env: fill in the empty values (copy them from Vercel) before deploying"
else
  echo "    already exists, left unchanged"
fi

echo "==> nginx"
export DOMAIN APP_PORT
envsubst '${DOMAIN} ${APP_PORT}' < "$HERE/nginx.conf.template" > /etc/nginx/sites-available/99visual
ln -sf /etc/nginx/sites-available/99visual /etc/nginx/sites-enabled/99visual
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> Start the site automatically after a reboot"
env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$APP_USER" --hp "/home/$APP_USER" >/dev/null || true

echo "==> Nightly database backup (03:30 server time, 14 days kept)"
install -m 755 "$HERE/backup-db.sh" /usr/local/bin/99visual-backup
cat > /etc/cron.d/99visual <<CRON
30 3 * * * root /usr/local/bin/99visual-backup >> /var/log/99visual-backup.log 2>&1
CRON
chmod 644 /etc/cron.d/99visual

echo "==> HTTPS certificate"
SERVER_IP="$(curl -fsS https://api.ipify.org || true)"
DNS_IP="$(dig +short "www.$DOMAIN" A | tail -n1 || true)"
if [ -n "$SERVER_IP" ] && [ "$SERVER_IP" = "$DNS_IP" ] && [ -n "$EMAIL" ]; then
  certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect \
    || echo "    certbot failed: check that both $DOMAIN and www.$DOMAIN point here, then run the command in the guide."
else
  echo "    www.$DOMAIN still points to '${DNS_IP:-nothing}', this server is '${SERVER_IP:-unknown}'."
  echo "    That's expected before the switch-over. After changing DNS (guide step 9), run:"
  echo "    certbot --nginx -d $DOMAIN -d www.$DOMAIN -m ${EMAIL:-you@example.com} --agree-tos --redirect"
fi

cat <<DONE

Server is ready.
  Server address: ${SERVER_IP:-unknown}
Next (guide step 6 onwards):
  1. Fill in the empty values in $APP_DIR/.env   (nano $APP_DIR/.env)
  2. Copy the data from Neon:  NEON_URL='postgresql://...' bash $APP_DIR/deploy/oracle/copy-from-neon.sh
  3. Build and start:          sudo -iu $APP_USER bash $APP_DIR/deploy/oracle/deploy.sh
DONE
