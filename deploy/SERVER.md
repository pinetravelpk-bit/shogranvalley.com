# shogranvalley.com on the Inventive Clicks VPS

The site runs on the shared Inventive Clicks VPS (`72.62.193.221`, SSH alias `inventiveclicks-vps`) next to about 14 other Next.js sites. It is set up so that it never touches them.

| What | Where |
|---|---|
| Code (git clone of this repo) | `/var/www/shogranvalley/current` |
| Data: database, admin login, uploads | `/var/lib/shogranvalley` (**never delete**) |
| Daily backups (03:30, 14 days) | `/var/lib/shogranvalley/backups` |
| Node.js | `/opt/node24` (Node 24 for this site only; the system Node 22 is unchanged) |
| Service | `shogranvalley.service` → `127.0.0.1:3120` |
| Nginx | `/etc/nginx/sites-available/shogranvalley.com` (www → apex redirect) |
| Settings | `/var/www/shogranvalley/current/.env.local` (`APP_ORIGIN`, `DATA_DIR`) |

## Common commands (on the server, as root)

| Task | Command |
|---|---|
| Deploy the latest code from GitHub | `bash /var/www/shogranvalley/current/deploy/update.sh` |
| Status | `systemctl status shogranvalley` |
| Errors | `journalctl -u shogranvalley -n 100` |
| Restart | `systemctl restart shogranvalley` |
| Create admin login (first time) | `cd /var/www/shogranvalley/current && sudo -u shogranvalley env PATH=/opt/node24/bin:/usr/bin:/bin DATA_DIR=/var/lib/shogranvalley npm run setup-admin` |
| Reset admin password | the same command with `-- --reset` at the end |
| HTTPS (once DNS points here) | `certbot --nginx -d shogranvalley.com -d www.shogranvalley.com --redirect` |

`setup-server.sh` and `go-live.sh` in this folder are for a **dedicated** server only. Do not run them on this shared VPS: they change Node.js and Nginx defaults for every site.
