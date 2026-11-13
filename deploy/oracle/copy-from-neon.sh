#!/usr/bin/env bash
# Copy the 99visual data from Neon into this server's PostgreSQL. Run as root on the server:
#   NEON_URL='postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require' bash copy-from-neon.sh
#
# Neon is only READ: nothing there is changed, so the live Vercel site keeps working. The local database
# is replaced with Neon's current data each time you run this (run it once to test, and again just
# before switching DNS). Product images are on Cloudinary, so there are no files to copy.
set -euo pipefail
: "${NEON_URL:?Set NEON_URL to the Neon connection string (Vercel → Settings → Environment Variables → DATABASE_URL)}"
[ "$(id -u)" -eq 0 ] || { echo "Run as root (sudo -i)."; exit 1; }
APP_USER=visual99
DB_NAME="${DB_NAME:-visual99}"
DB_USER="${DB_USER:-visual99}"
DIR="${BACKUP_DIR:-/var/backups/99visual}"
mkdir -p "$DIR"; chmod 700 "$DIR"
STAMP="$(date +%Y%m%d-%H%M%S)"

echo "==> Checking versions"
SRC="$(psql "$NEON_URL" -tAc "SHOW server_version_num")"
SRC_MAJOR=$((SRC / 10000))
LOCAL_MAJOR="$(pg_dump --version | grep -oE '[0-9]+' | head -1)"
echo "    Neon: PostgreSQL $SRC_MAJOR, this server's tools: PostgreSQL $LOCAL_MAJOR"
if [ "$SRC_MAJOR" -gt "$LOCAL_MAJOR" ]; then
  echo "Neon runs a newer PostgreSQL than this server. Install postgresql-$SRC_MAJOR first (see the guide)."
  exit 1
fi

echo "==> Safety copy of the current local database"
(umask 077; sudo -u postgres pg_dump -Fc "$DB_NAME" > "$DIR/local-before-neon-$STAMP.dump")

echo "==> Downloading from Neon"
OUT="$DIR/from-neon-$STAMP.dump"
(umask 077; pg_dump -Fc --schema=public --no-owner --no-privileges "$NEON_URL" -f "$OUT")
echo "    saved $OUT ($(du -h "$OUT" | cut -f1))"

echo "==> Loading into $DB_NAME"
sudo -iu "$APP_USER" pm2 stop 99visual >/dev/null 2>&1 || true
# A clean schema owned by the app user, then everything restored as that user, in one transaction.
sudo -u postgres psql -v ON_ERROR_STOP=1 -q -d "$DB_NAME" \
  -c "DROP SCHEMA IF EXISTS public CASCADE" \
  -c "CREATE SCHEMA public AUTHORIZATION $DB_USER"
# The dump also contains "CREATE SCHEMA public" (and its comment); skip those, the schema was just made.
LIST="$(mktemp)"
pg_restore -l "$OUT" | grep -vE ' (SCHEMA|COMMENT) - (SCHEMA )?public ' > "$LIST"
chmod 644 "$LIST"
sudo -u postgres pg_restore --no-owner --no-privileges --role="$DB_USER" --single-transaction --exit-on-error \
  -L "$LIST" -d "$DB_NAME" < "$OUT"
rm -f "$LIST"
sudo -iu "$APP_USER" pm2 start 99visual >/dev/null 2>&1 || true

echo "==> Rows copied (Neon → here)"
for t in $(sudo -u postgres psql -tA -d "$DB_NAME" -c "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1"); do
  here="$(sudo -u postgres psql -tA -d "$DB_NAME" -c "SELECT count(*) FROM public.\"$t\"")"
  there="$(psql "$NEON_URL" -tAc "SELECT count(*) FROM public.\"$t\"")"
  flag=""; [ "$here" = "$there" ] || flag="   <-- differs (Neon changed during the copy? run again)"
  printf "    %-28s %8s %8s%s\n" "$t" "$there" "$here" "$flag"
done
echo "Done. The previous local data is saved in $DIR/local-before-neon-$STAMP.dump"
