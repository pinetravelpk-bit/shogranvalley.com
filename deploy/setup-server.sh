#!/usr/bin/env bash
# One-time setup of a fresh Ubuntu 22.04/24.04 VPS for shogranvalley.com.
# Run as root:  sudo bash deploy/setup-server.sh staging.shogranvalley.com
# Installs Node.js 24, Nginx and Certbot, creates the app user and folders,
# builds the site and starts it as a systemd service behind Nginx.
set -euo pipefail

DOMAIN="${1:-staging.shogranvalley.com}"
APP_USER=shogran
APP_DIR=/var/www/shogranvalley
DATA_DIR=/var/lib/shogranvalley
REPO=https://github.com/pinetravelpk-bit/shogranvalley.com.git

if [[ $EUID -ne 0 ]]; then echo "Run this as root (sudo)."; exit 1; fi

echo "==> Installing system packages"
apt-get update -y
apt-get install -y curl git nginx certbot python3-certbot-nginx apache2-utils ufw sqlite3
if ! command -v node >/dev/null || [[ "$(node -v)" != v24* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
  apt-get install -y nodejs
fi
echo "Node $(node -v), npm $(npm -v)"

echo "==> Firewall: SSH + web only"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> App user and folders"
id -u "$APP_USER" >/dev/null 2>&1 || adduser --system --group --home /home/$APP_USER --shell /usr/sbin/nologin "$APP_USER"
mkdir -p "$APP_DIR" "$DATA_DIR/backups"
chown -R "$APP_USER:$APP_USER" "$APP_DIR" "$DATA_DIR"
chmod 750 "$DATA_DIR"

echo "==> Getting the code"
if [[ ! -d "$APP_DIR/.git" ]]; then
  sudo -u "$APP_USER" git clone "$REPO" "$APP_DIR"
else
  sudo -u "$APP_USER" git -C "$APP_DIR" pull --ff-only
fi

# Use the private full data (with booking enquiries) on first start, if uploaded.
if [[ -f /root/seed-full-with-bookings.json && ! -f "$DATA_DIR/site.sqlite" ]]; then
  echo "==> Using private seed with booking enquiries for the first start"
  cp /root/seed-full-with-bookings.json "$APP_DIR/data/seed.json"
  chown "$APP_USER:$APP_USER" "$APP_DIR/data/seed.json"
fi

echo "==> Environment file"
cat > "$APP_DIR/.env.local" <<EOF
APP_ORIGIN=https://$DOMAIN
DATA_DIR=$DATA_DIR
EOF
chown "$APP_USER:$APP_USER" "$APP_DIR/.env.local"; chmod 640 "$APP_DIR/.env.local"

echo "==> Installing and building (a few minutes)"
cd "$APP_DIR"
sudo -u "$APP_USER" -H npm ci --no-audit --no-fund
sudo -u "$APP_USER" -H env DATA_DIR="$DATA_DIR" npm run build

echo "==> Service"
cp deploy/shogranvalley.service /etc/systemd/system/shogranvalley.service
systemctl daemon-reload
systemctl enable --now shogranvalley
# The first request creates the SQLite database from data/seed.json; then restore the public seed file.
for i in $(seq 1 30); do curl -fsS -o /dev/null http://127.0.0.1:3000/robots.txt && break; sleep 2; done
test -f "$DATA_DIR/site.sqlite" && echo "Database created in $DATA_DIR" || echo "!! Database not created yet - check: journalctl -u shogranvalley -n 50"
sudo -u "$APP_USER" git checkout -- data/seed.json 2>/dev/null || true
rm -f /root/seed-full-with-bookings.json

echo "==> Nginx"
sed "s/__DOMAIN__/$DOMAIN/g" deploy/nginx-shogranvalley.conf > /etc/nginx/sites-available/shogranvalley
ln -sf /etc/nginx/sites-available/shogranvalley /etc/nginx/sites-enabled/shogranvalley
rm -f /etc/nginx/sites-enabled/default
if [[ "$DOMAIN" == staging.* && ! -f /etc/nginx/.htpasswd-shogran ]]; then
  echo "Choose a password for the staging preview (username: preview):"
  htpasswd -c /etc/nginx/.htpasswd-shogran preview
fi
nginx -t && systemctl reload nginx

echo "==> HTTPS certificate for $DOMAIN"
certbot --nginx -d "$DOMAIN" --redirect --agree-tos --register-unsafely-without-email -n || \
  echo "!! Certbot failed. Check that $DOMAIN points to this server in Cloudflare, then run: certbot --nginx -d $DOMAIN --redirect"

echo "==> Daily database backup at 03:30"
cat > /etc/cron.d/shogranvalley-backup <<EOF
30 3 * * * $APP_USER sqlite3 $DATA_DIR/site.sqlite ".backup '$DATA_DIR/backups/site-\$(date +\%F).sqlite'" && find $DATA_DIR/backups -name 'site-*.sqlite' -mtime +14 -delete
EOF

echo
echo "Done. Site: https://$DOMAIN"
echo "Create the admin login now with:"
echo "  cd $APP_DIR && sudo -u $APP_USER env DATA_DIR=$DATA_DIR npm run setup-admin"
