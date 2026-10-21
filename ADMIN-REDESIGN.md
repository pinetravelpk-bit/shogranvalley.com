# Admin dashboard redesign

The admin panel now uses a custom Next.js implementation inspired by the supplied Kamr reference: white sidebar, coral accents, soft gray workspace, room photo cards, summary strip, activity chart, status ring and structured tables. No commercial template code or reference imagery is bundled.

Implemented sections:
- Dashboard with actual stored enquiry totals, recent daily activity, status distribution, property counts and management shortcuts.
- Hotels and room collection, with image cards linked to the hotel editor.
- Friendly hotel/room fields for location, address, booking WhatsApp, starting price, names, capacity, base/weekend/peak rates, beds, primary image, description and facilities. Unknown imported room properties and galleries are retained. Advanced JSON fields remain available.
- Searchable, paginated enquiries with status filters and detailed records; existing authenticated status updates remain connected.
- Guest directory derived from stored enquiries, searchable by name, phone or email. It is not a guest login system.
- Existing tours, transport, blog, pages, legacy products, media uploads, SEO fields, redirects and site settings continue to work.
- Responsive drawer navigation and redesigned admin login.

Dashboard cards and charts describe enquiries and catalog data. They do not claim live occupancy, paid revenue or visitor analytics. Setting an enquiry to confirmed does not process payment, verify room availability or notify guests automatically.

The hosted preview is read-only and uses clearly labeled sample enquiries. The complete downloadable Next.js app uses the authenticated admin API and actual stored data. No guest records are included in the hosted preview.

Validation: production and static preview builds passed; all 16 migration/booking/admin integration checks passed. Exported admin sections, room images, navigation assets and sample-data rendering were checked. Browser-based visual and interaction QA remains unverified in this environment.
