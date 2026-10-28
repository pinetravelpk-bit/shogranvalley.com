#!/usr/bin/env bash
# Switch the server from the staging preview to the real domain. Run as root:
#   sudo bash /var/www/shogranvalley/deploy/go-live.sh
# Do this right after pointing shogranvalley.com and www in Cloudflare to this server.
set -euo pipefail
APP_DIR=/var/www/shogranvalley
DATA_DIR=/var/lib/shogranvalley

echo "==> Site origin -> https://shogranvalley.com"
cat > "$APP_DIR/.env.local" <<EOF
APP_ORIGIN=https://shogranvalley.com
DATA_DIR=$DATA_DIR
EOF
chown shogran:shogran "$APP_DIR/.env.local"; chmod 640 "$APP_DIR/.env.local"

echo "==> Nginx for shogranvalley.com + www (no password, indexable)"
sed "s/__DOMAIN__/shogranvalley.com www.shogranvalley.com/g" "$APP_DIR/deploy/nginx-shogranvalley.conf" > /etc/nginx/sites-available/shogranvalley
nginx -t && systemctl reload nginx

echo "==> HTTPS certificate"
certbot --nginx -d shogranvalley.com -d www.shogranvalley.com --redirect --agree-tos --register-unsafely-without-email -n

echo "==> Restarting the site"
systemctl restart shogranvalley
sleep 3
curl -sI https://shogranvalley.com/ | head -1
echo "Live. Submit https://shogranvalley.com/sitemap.xml in Google Search Console and Bing Webmaster Tools."
