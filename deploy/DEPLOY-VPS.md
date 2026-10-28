# Deploying shogranvalley.com on your VPS (Cloudflare DNS)

Three stages: **set up the server → check the preview at `staging.shogranvalley.com` → go live**. Your current live site keeps working until the last stage.

You need: an **Ubuntu 22.04 or 24.04** VPS with at least 2 GB RAM, its **IP address**, and **SSH access as root** (or a user with `sudo`). Never paste your server password into a chat or a file.

---

## Stage 1: point the preview address at the VPS (Cloudflare)

Cloudflare → `shogranvalley.com` → **DNS → Records → Add record**:

| Type | Name | Content | Proxy status |
|---|---|---|---|
| A | `staging` | *your VPS IP* | **DNS only (grey cloud)** for now |

Keep it grey until the HTTPS certificate is issued in Stage 2.

## Stage 2: set up the server

**1. Copy the private data file** (the one with the 406 booking enquiries) from your PC to the server. In **Windows PowerShell** on your PC:

```bash
scp "D:\Inventive Clicks\shogranvalley.com-work\private\seed-full-with-bookings.json" root@YOUR_VPS_IP:/root/
```

**2. Log in to the server**:

```bash
ssh root@YOUR_VPS_IP
```

**3. Download the code and run the setup** (takes about 5–10 minutes):

```bash
git clone https://github.com/pinetravelpk-bit/shogranvalley.com.git /tmp/sv && bash /tmp/sv/deploy/setup-server.sh staging.shogranvalley.com
```

During setup you'll be asked to **choose a password for the preview** (username `preview`). Share it only with people who should see the preview.

The script installs Node.js 24, Nginx and an HTTPS certificate, builds the site, loads the private data (then deletes the uploaded copy), starts the site as a service, and sets up a daily database backup.

**4. Create the admin login**:

```bash
cd /var/www/shogranvalley && sudo -u shogran env DATA_DIR=/var/lib/shogranvalley npm run setup-admin
```

It prints a username (`admin`) and a random password. Save them in a password manager.

**5. Optional:** in Cloudflare, switch the `staging` record to **Proxied (orange cloud)**, and set **SSL/TLS → Overview → Full (strict)**.

## Stage 3: check the preview

Open **https://staging.shogranvalley.com** (login: `preview` + your preview password) and check:

- Home, Hotels, Tours, Rent a Car, Blog and a few hotel/car pages on **phone and desktop**
- Send a **test hotel enquiry**, download the invoice PDF and try the WhatsApp button
- **/admin/**: sign in, check Booking enquiries (your 406 imported enquiries plus the test one) and the invoice editor

The preview is password-protected and marked `noindex`, so Google won't index it.

## Stage 4: go live

**1. Cloudflare → DNS** (note the old values first, so you can switch back):

| Type | Name | Content | Proxy status |
|---|---|---|---|
| A | `shogranvalley.com` (`@`) | *your VPS IP* | **DNS only (grey)** for a few minutes |
| A or CNAME | `www` | *your VPS IP* (or `shogranvalley.com`) | **DNS only (grey)** |

Delete any other A/AAAA/CNAME records for `@` and `www` that point to the old host. **Leave MX and TXT (email) records alone.**

**2. On the server:**

```bash
sudo bash /var/www/shogranvalley/deploy/go-live.sh
```

This switches the site to `https://shogranvalley.com`, removes the preview password, and issues the HTTPS certificate for both addresses.

**3. In Cloudflare:** turn `@` and `www` back to **Proxied (orange)**, keep **SSL/TLS = Full (strict)**, and you can delete the `staging` record.

**4. Then:** submit `https://shogranvalley.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Also see the owner action list in `SEO-AEO-GEO.md`.

**To roll back:** put the old DNS values back in Cloudflare. The old site comes back within minutes.

---

## Everyday tasks

| Task | Command (on the server) |
|---|---|
| Install the latest code from GitHub | `sudo bash /var/www/shogranvalley/deploy/update.sh` |
| Is the site running? | `systemctl status shogranvalley` |
| See recent errors | `journalctl -u shogranvalley -n 100` |
| Restart | `sudo systemctl restart shogranvalley` |
| Reset the admin password | `cd /var/www/shogranvalley && sudo -u shogran env DATA_DIR=/var/lib/shogranvalley npm run setup-admin -- --reset` |
| Backups | Daily at 03:30 in `/var/lib/shogranvalley/backups` (last 14 days). Download one now and then with `scp`. |

**Where things live**

- Code: `/var/www/shogranvalley` (from GitHub; safe to update)
- Data: `/var/lib/shogranvalley`, containing `site.sqlite` (all content, enquiries, invoices), `admin.json` (admin login) and `uploads/` (images uploaded in admin). **Never delete this folder.**
