#!/usr/bin/env bash
# Update, build and (re)start www.99visual.com. Run as the app user:
#   sudo -iu visual99 bash /var/www/99visual/deploy/server/deploy.sh
# Takes about 3 to 6 minutes. Visitors keep seeing the running version until the new build is ready.
#
#   PULL=0  skip "git pull" (deploy exactly what is in the folder)
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."
APP_NAME=99visual
PORT=3100

[ "$(id -un)" != "root" ] || { echo "Run as the app user: sudo -iu visual99 bash $0"; exit 1; }
[ -f .env ] || { echo ".env is missing. Run setup-server.sh first."; exit 1; }
# Read single values from .env without executing it (values such as Gmail app passwords contain spaces).
env_get() { grep -E "^$1=" .env | tail -n1 | cut -d= -f2- | sed -E 's/^"(.*)"$/\1/; s/^'"'"'(.*)'"'"'$/\1/'; }
DATABASE_URL="$(env_get DATABASE_URL)"
[[ "$DATABASE_URL" == postgres* ]] || { echo "DATABASE_URL is not set in .env"; exit 1; }
for name in EMAIL_USER EMAIL_PASS CLOUDINARY_CLOUD_NAME RESEND_API_KEY; do
  [ -n "$(env_get "$name")" ] || echo "    warning: $name is empty in .env (copy it from Vercel)"
done

if [ "${PULL:-1}" = "1" ] && [ -d .git ]; then
  echo "==> Getting the latest code"
  git pull --ff-only
fi

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Database migrations"
# A database copied from Neon may have been set up without Prisma's migration history. In that case,
# record each migration whose tables already exist as applied, so Prisma doesn't try to create them again.
if [ "$(psql "$DATABASE_URL" -tAc "SELECT to_regclass('public._prisma_migrations') IS NULL")" = "t" ] \
   && [ "$(psql "$DATABASE_URL" -tAc "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public'")" != "0" ]; then
  echo "    existing tables without migration history: recording migrations that are already in place"
  for dir in prisma/migrations/*/; do
    name="$(basename "$dir")"
    tables="$(grep -oE 'CREATE TABLE "[^"]+"' "$dir/migration.sql" | sed -E 's/CREATE TABLE "([^"]+)"/\1/' || true)"
    [ -n "$tables" ] || break
    missing=0
    for t in $tables; do
      [ "$(psql "$DATABASE_URL" -tAc "SELECT to_regclass('public.\"$t\"') IS NOT NULL")" = "t" ] || missing=1
    done
    [ "$missing" = "0" ] || break
    npx prisma migrate resolve --applied "$name"
  done
fi
npx prisma migrate deploy

echo "==> Building"
npm run build

echo "==> Starting"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 reload deploy/server/ecosystem.config.cjs --update-env
else
  pm2 start deploy/server/ecosystem.config.cjs
fi
pm2 save >/dev/null

echo "==> Checking"
for _ in $(seq 1 20); do
  code="$(curl -s -o /dev/null -w '%{http_code}' -H 'Host: www.99visual.com' "http://127.0.0.1:$PORT/" || true)"
  [ "$code" = "200" ] && break
  sleep 2
done
if [ "$code" = "200" ]; then
  echo "Done: the site answers on port $PORT."
else
  echo "The site did not answer yet (HTTP $code). Look at: pm2 logs $APP_NAME --lines 50"
  exit 1
fi
