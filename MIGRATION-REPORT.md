# Shogran Valley live-site refresh

Updated on 13 October 2026 using the supplied database/theme and public pages and image files from https://shogranvalley.com/.

## Current result

- 114 stored content records; 109 public content URLs, with original redirects retained.
- 66 public posts/pages refreshed from the live WordPress API.
- 94 matching public pages refreshed with their live SEO title, description, canonical and indexing flag where present.
- 123 imported taxonomy archive routes and 26 permanent redirects.
- 523 of 523 original image records bundled; 653 downloaded image files total, including referenced thumbnails and theme assets.
- 401 historical bookings and 5 invoices remain private behind admin authentication.

The two old tour URLs `/tours/3-days-tour-to-shogran-siri-paye-and-sharan-forest/` and `/tours/4-days-tour/` were inspected live. Both serve the general tours listing and declare `https://shogranvalley.com/tours/` as canonical. The migration now uses 301 redirects to `/tours/`, preserving that destination without fabricating tour detail content.

A crawl checked 114 public URLs and sitemap resources: 104 returned 200 and 10 old product URLs returned 404 on the source website. Those 10 legacy product records have been retained from the supplied database, rather than discarding their content. See `reports/live-page-check.json`.

## Media behavior

Downloaded originals are stored in `media/uploads` and served at the exact existing `/wp-content/uploads/` paths. Admin replacements are saved in `DATA_DIR/uploads` and take precedence. Downloaded referenced thumbnail files are included. Other known dimension-based thumbnail URLs are generated from their original on request; those generated crops may differ from old WordPress crops. The two non-image references (TXT and MOV) are not part of the image migration.

Missing original images: 0. File inventory and failed requests, if any, are in `reports/live-media.json`.

## Scope and verification limits

The private preview includes public content and images only. Its admin is a read-only demo and its booking forms do not submit enquiries. The downloadable Next.js app has authenticated administration, image uploads and persistent booking enquiries.

WordPress plugin runtime, WooCommerce payment/cart checkout, automatic email notifications, the old staff invoice generator and Google Sheets room-stock integration are not ported. Booking forms create enquiries, not confirmed reservations. The responsive frontend is a React reimplementation, not a verified pixel-identical rendering of every original template.

Only public content can be refreshed from the live site. Private bookings are retained from the supplied database snapshot, not fetched from public endpoints. No live domain cutover, Search Console audit or browser screenshot comparison is claimed. Search ranking outcomes cannot be guaranteed.

Keep the source archive private because its server-only seed includes historical customer data. Use persistent Node.js hosting as described in README.md. Full build and integration results are included in `reports/`.
