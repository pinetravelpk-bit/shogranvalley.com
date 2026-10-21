# Shogran Valley — Next.js migration

A runnable Next.js App Router website and private administration panel built from the supplied Shogran Valley theme, the 8 October 2026 database backup, and the supplied sitemap. No WordPress installation is needed to run it.

## Quick start

Use **Node.js 24 LTS** and npm. Extract the project, open a terminal in its folder, then run:

```bash
npm ci
npm run setup-admin
npm run build
npm start
```

Open `http://localhost:3000/`. Sign in at `http://localhost:3000/admin/` using the username and randomly generated password printed by `setup-admin`. There is no shared or default password. Store the generated password securely.

For development, run `npm run dev` instead of building and starting production.

Reset a lost password with:

```bash
npm run setup-admin -- --reset
```

This generates a new password and revokes existing sessions.

## Production hosting

Deploy this as a **single persistent Node.js server**, behind HTTPS. It is not a static HTML export. Its SQLite database and uploaded files must persist across redeployments. A VPS, container with a persistent disk, or Node.js hosting with persistent storage is suitable. An unmodified deployment to an ephemeral/serverless filesystem is not suitable.

Copy `.env.example` to `.env.local` and set:

```dotenv
APP_ORIGIN=https://shogranvalley.com
DATA_DIR=/absolute/persistent/path/shogran-data
```

Use the actual public HTTPS origin. This setting controls form origin validation and secure login cookies. Set it to your staging origin when testing staging. Keep staging access restricted so duplicate production content is not indexed.

Run `npm run setup-admin` after setting the production data directory, then build and start. Forward all website requests to Next.js, including `/wp-content/uploads/`. The reverse proxy must allow at least 16MB requests for image uploads. Keep the original domain and URL paths when replacing WordPress. Test on staging before changing the live domain's routing.

The source data retains production canonical URLs at `https://shogranvalley.com`. For an intentional domain change, update `settings.siteUrl` in the source data before first launch and `metadataBase` in `app/layout.jsx`; an established installation's data lives in SQLite, not in the seed file.

## Admin panel

- **Overview:** content, media and booking counts; migration items needing attention.
- **Hotels, Tours, Vehicles, Blog posts, Pages, Legacy products:** edit titles, HTML content, excerpts, publishing status, URLs, SEO text and featured image IDs. Imported prices, room types, itineraries and other details remain editable in the metadata JSON field.
- **Media library:** replace an existing image without changing its original URL, bulk restore by exact original filename, upload new images, and update image titles and alt text.
- **Booking enquiries:** search imported records, inspect enquiries and update status.
- **URLs & migration:** review missing source pages and add relevant permanent redirects.
- **Site settings:** edit contact information, hero and About text, and the hero image URL.

Existing URLs should normally stay unchanged. Renaming a content URL automatically creates a 301 and updates redirects pointing to the old path. Use redirects only to genuinely equivalent published pages.

## Uploading images later

The backup references 525 media items. This updated build bundles 523 original images and 653 downloaded image files in total, including referenced thumbnails and theme images. Original image files live in `media/uploads`; the server serves them at their original `/wp-content/uploads/` URLs. Admin replacements override bundled files through the persistent data directory.

1. Open **Admin → Media library**.
2. Find an existing image using its title, filename or URL.
3. Choose **Replace at same URL** and select the original image from your computer.
4. The original `/wp-content/uploads/YYYY/MM/filename.ext` path remains the same. Known dimension-based thumbnail variants are generated automatically.

For several images, use **Restore by exact filename**. Duplicate filenames need individual replacement. Uploads are processed one file at a time; each image must be under 15MB. Supported formats: JPG, JPEG, PNG, WebP, GIF and AVIF. GIF animation is not preserved by the image conversion pipeline. The two non-image source references, a TXT and a MOV, are retained as records but cannot be restored by this image uploader.

Choosing **Upload new images** creates new URLs, so use replacement or filename restore for existing content. Images embedded inside imported article HTML retain their source alt text; changing a media item's alt field does not rewrite old article HTML. Edit that article's HTML when needed.

Downloaded original images are restored. For a known thumbnail URL not included as an exact downloaded file, the server generates the requested dimensions from the original. Unknown or unavailable media still return a real 404. See `reports/live-media.json` for the exact inventory.

## Content and SEO preservation

- Imports 114 content records, including drafts and staff pages. There are 109 public content URLs; three retain original redirects to hotel detail pages.
- Includes 56 blog posts, 6 hotels, 3 tours, 17 vehicles, 17 legacy products and 10 public pages.
- Refreshes 66 public posts/pages and metadata for 94 pages from the live site. Restores the public static Sharan tour template's package prices, inclusions and itinerary into editable content for its two original page paths.
- Provides 123 imported taxonomy archive routes and 26 permanent redirects.
- Preserves supported SEO titles, descriptions, canonicals, indexing flags, social metadata and Google verification.
- Includes an XML sitemap, robots.txt, server-rendered content, real 404 responses, pagination and WordPress ID URL redirects.
- Uses the original domain and existing content paths. New uploads can restore existing image paths.

Read `MIGRATION-REPORT.md` before launch. The two old tour sitemap URLs serve the tours index on the live website and declare `/tours/` as canonical. They now redirect permanently to that same listing. Preserving URLs and metadata does not guarantee unchanged search rankings.

## Booking behavior and source limitations

Public forms create durable **booking enquiries**, with a reference number, visible in the admin panel. They do not take payments, automatically confirm reservations, deduct room stock or send email. WhatsApp links let visitors contact the business directly.

The original PHP/WordPress plugin runtime is not included. Legacy WooCommerce products are presented as content with booking enquiries, not a WooCommerce cart or checkout. Imported booking and invoice records are private in the admin panel. The original staff invoice generator and Google Sheets room-availability integration are not reproduced; `/create-invoice/` and `/room-availability/` redirect to the private admin panel. Tracking scripts are not activated automatically. The responsive frontend is a Next.js reimplementation, not a verified pixel-identical rendering of Elementor or every WordPress template.

## Data, backup and privacy

`data/seed.json` initializes the database only on first launch. Subsequent edits are saved in `DATA_DIR/site.sqlite`; media are in `DATA_DIR/uploads`; admin password hashes are in `DATA_DIR/admin.json`. Editing the seed after initialization does not update existing data.

Stop the server before copying the entire data directory for a consistent offline backup, then restart it. Restore that directory to recover content, enquiries, uploaded images and the admin account. Never delete the live data directory during a code update.

**This project contains imported customer booking and invoice data. Keep the source archive and repository private.** Serve only through Next.js; never publish the project root as a static directory. Only `public/` is intended for direct static serving. No original WordPress configuration, database login credentials or default admin password is included.

## Verification

```bash
npm run build
npm test
```

The integration suite uses a temporary database and local server on port 3187. It checks published URLs, archives, redirects, metadata, real 404 behavior, login and origin validation, booking persistence, image replacement and thumbnail paths, content editing, server restart persistence and logout. It does not modify the production data directory. All 11 tests passed in the delivered version.

Browser visual, mobile-device and live-domain deployment verification still need to be performed on your hosting. The project has not been deployed to your live website.

## Updating an installation made from the earlier ZIP

A fresh installation automatically imports the latest seed. Existing SQLite content is never silently overwritten: installing these code/media files restores images, but does not overwrite content already edited in your existing database. Back up your data directory and reconcile content edits before importing a newer seed. Keep both `media/uploads` and your persistent data directory in your deployment and backups.
