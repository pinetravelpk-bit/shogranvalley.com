# Listing filters and Pine Travel invoices

## Listings
Hotels, Tours and Rent a Car retain their existing URLs and now use a left-filter/grid layout inspired by the supplied Hotelier reference. Search, sorting, grid/list view, pagination and mobile filters are functional. Filters use imported data only: property/vehicle/tour type, location/departure, price, hotel class, amenities, tour duration, seating/room capacity, transmission and fuel where available. No fabricated discounts, reviews or availability claims are shown.

Dates selected in the hotel listing carry into the hotel enquiry. Dates do not represent real-time inventory. Filter URLs keep canonical paths and are noindex/follow on the full server site; legacy pagination routes remain supported.

## Automatic draft invoice
Each new enquiry now creates one persisted invoice draft in the same transaction. The draft captures the client, booking reference, selected listing, room, dates, nights, quantity and trusted base rate. Existing enquiries get their draft when an admin opens Generate invoice. Repeated requests reuse the same invoice. Zero/unknown rates remain unconfirmed and cannot be issued.

Open Admin → Booking enquiries → View details → Pine Travel invoice. Review or edit the hotel, contact details, dates, room lines, tax, advance and agent. Save the invoice, then download the PDF or use the system file-share sheet on supported devices. WhatsApp and email links open prefilled drafts; attach the PDF manually if file sharing is unsupported. No message is sent automatically.

The invoice uses the attached Pine Travel template. Pine Travel branding, its logo and corrected phone 03010873333, the 30% advance note, cancellation policy, Meezan Bank and JazzCash account details are preserved. The source client's personal details were removed from the reusable template. Tax defaults to the sample's 10% arithmetic and is editable; this is not a determination of applicable tax. The PDF supports up to two room lines per invoice and a Draft label until an admin verifies and issues it.

Hotel name and website vary with the selected listing. The Pine Park logo is used for Pine Park; other hotels can select their own uploaded logo ID and website in the hotel editor. No unrelated hotel's logo is automatically used. Pine Travel branding always remains.

PDF access and invoice edits require an authenticated admin; writes require the same origin. Invoice/customer PDFs are never publicly published or cached. The preview generates a separate PDF from each selected demo enquiry. Hotel enquiry submissions are held only in the current browser tab’s sessionStorage, and appear in Admin → Booking enquiries in that tab. They are not sent to the server or the hotel. The sample PDF is illustrative, not a real customer bill.

## Deployment
The full Node.js Next.js app needs writable persistent runtime storage. Include the assets/invoice directory (template and font assets), and install dependencies with npm ci. The downloaded project includes the PDF renderer and all invoice assets. Retain existing runtime data when updating. The static hosted preview does not run server APIs.

## Verification
Production and static builds, filter logic, URL/redirect regression checks, authentication/origin protection, automatic draft idempotency, invoice validation and PDF downloads are checked. The invoice PDF is visually rendered and reviewed. Browser interaction and real-phone sharing are not verified in this environment.

## Invoice correction
Invoice details open automatically for the selected enquiry. Hotel ID (or legacy hotel-name field), client name, phone, email, room, quantity, nights, dates, guest count and special requests populate the invoice. Old unissued drafts are remapped on first access; changed enquiry details refresh unissued drafts. Issued invoices remain historical snapshots. Refresh details from enquiry can restore original form details on unissued drafts. The authenticated API and local demo share the same mapping and PDF renderer. Separate client/hotel tests prevent cross-enquiry values. The preview’s former fixed sample download has been replaced by per-enquiry PDF generation.
