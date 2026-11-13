#!/usr/bin/env bash
# Nightly PostgreSQL backup for 99visual: compressed dump in /var/backups/99visual, 14 days kept.
# Installed as /usr/local/bin/99visual-backup and run by cron at 03:30 (as root).
# Images live on Cloudinary, so the database is all that needs backing up here.
#
# COPY BACKUPS OFF THE SERVER too: a backup on the same disk is lost with the server. The newest one is
# also copied to /home/ubuntu so you can download it from Windows (PowerShell):
#   scp -i your-key.key ubuntu@SERVER_IP:99visual-latest.dump .
set -euo pipefail
DB_NAME="${DB_NAME:-visual99}"
DIR="${BACKUP_DIR:-/var/backups/99visual}"
STAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DIR"; chmod 700 "$DIR"
umask 077
sudo -u postgres pg_dump -Fc "$DB_NAME" > "$DIR/99visual-$STAMP.dump.tmp"
mv "$DIR/99visual-$STAMP.dump.tmp" "$DIR/99visual-$STAMP.dump"
cp "$DIR/99visual-$STAMP.dump" "$DIR/latest.dump"
if id ubuntu >/dev/null 2>&1; then                      # Oracle's default login user, for downloading
  install -m 600 -o ubuntu -g ubuntu "$DIR/latest.dump" /home/ubuntu/99visual-latest.dump
fi
find "$DIR" -name '99visual-*.dump' -mtime +14 -delete
echo "$(date -Is) backup ok: 99visual-$STAMP.dump ($(du -h "$DIR/99visual-$STAMP.dump" | cut -f1))"
