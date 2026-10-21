# Hotel pages and booking update

Six existing hotel routes now share a redesigned responsive detail layout: photo mosaic and full-screen gallery, room-specific photos, capacity and facilities, room selection, original rates, hotel overview, amenities, policies and location. Existing hotel paths, media paths and canonical metadata are retained.

Booking uses two steps (stay, contact details), with a sticky desktop panel and a mobile sheet. Guests can edit the stay without losing contact details. The form prevents duplicate submission while pending, preserves input on errors, and returns an enquiry reference on success. WhatsApp links include the selected stay.

The server validates hotel/room association, calendar dates, stay length, room counts and guest capacity. It computes the estimate from stored room rates, ignoring client-supplied amounts. Pending enquiries persist in the existing admin store with rooms, nights and the base-rate estimate. This does not check live inventory, take payment or confirm a reservation. Seasonal/weekend rates, taxes, meals and extras require confirmation.

The hosted private theme preview demonstrates both steps but sends no enquiry and contains no private booking data. The downloadable Next.js application includes the working enquiry API and admin integration.

Validation: production build and static preview build passed; 16 automated tests passed. Checks cover all published imported URLs, taxonomy archives, redirects, canonical markup, protected admin data, media replacement, persistence after restart, date/capacity rules and server-side hotel estimates. All 34 hotel media paths referenced by exported hotel HTML resolve to bundled files. Browser interaction and visual QA were unavailable in this environment; responsive layouts and accessibility behavior still need an actual-device review before production deployment.
