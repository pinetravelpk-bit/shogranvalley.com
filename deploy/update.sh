#!/usr/bin/env bash
# Pull the latest code from GitHub, rebuild and restart. Run as root:
#   sudo bash /var/www/shogranvalley/deploy/update.sh
# The database and uploaded images in /var/lib/shogranvalley are not touched.
set -euo pipefail
APP_USER=shogran
APP_DIR=/var/www/shogranvalley
DATA_DIR=/var/lib/shogranvalley

cd "$APP_DIR"
echo "==> Backing up the database"
sqlite3 "$DATA_DIR/site.sqlite" ".backup '$DATA_DIR/backups/site-before-update-$(date +%F-%H%M).sqlite'"
echo "==> Pulling code"
sudo -u "$APP_USER" git pull --ff-only
echo "==> Installing and building"
sudo -u "$APP_USER" -H npm ci --no-audit --no-fund
sudo -u "$APP_USER" -H env DATA_DIR="$DATA_DIR" npm run build
echo "==> Restarting"
systemctl restart shogranvalley
sleep 3
systemctl --no-pager --lines=5 status shogranvalley
echo "Updated to $(git log --oneline -1)"
