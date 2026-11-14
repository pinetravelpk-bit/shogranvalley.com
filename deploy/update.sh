#!/usr/bin/env bash
# Pull the latest code from GitHub, rebuild and restart shogranvalley.com.
# On the Inventive Clicks VPS (shared with other sites), run as root:
#   sudo bash /var/www/shogranvalley/current/deploy/update.sh
# The database and uploaded images in /var/lib/shogranvalley are not touched.
set -euo pipefail
APP_USER=shogranvalley
APP_DIR=/var/www/shogranvalley/current
DATA_DIR=/var/lib/shogranvalley
NODE_PATH_DIR=/opt/node24/bin   # this site's own Node 24; other sites use the system Node
RUN="sudo -u $APP_USER -H env PATH=$NODE_PATH_DIR:/usr/bin:/bin DATA_DIR=$DATA_DIR NEXT_TELEMETRY_DISABLED=1"

cd "$APP_DIR"
echo "==> Backing up the database"
sudo -u "$APP_USER" sqlite3 "$DATA_DIR/site.sqlite" ".backup '$DATA_DIR/backups/site-before-update-$(date +%F-%H%M).sqlite'"
echo "==> Pulling code"
sudo -u "$APP_USER" git pull --ff-only
echo "==> Installing and building"
$RUN npm ci --no-audit --no-fund
$RUN nice -n 10 npm run build
echo "==> Restarting"
systemctl restart shogranvalley
sleep 4
systemctl is-active shogranvalley
curl -s -o /dev/null -w "local check: %{http_code}\n" http://127.0.0.1:3120/robots.txt
echo "Updated to $(sudo -u "$APP_USER" git log --oneline -1)"
