# SEO, AEO, GEO & Local SEO (October 2026)

## Code layout
| File | Purpose |
|---|---|
| `lib/knowledge.mjs` | Single source of truth: business name, address, phone and coordinates (NAP), service area, Shogran quick facts, home FAQ, and the destination guides. Edit facts here. |
| `lib/seo.mjs` | Titles, descriptions, canonical rules, breadcrumbs and the JSON-LD `@graph` for every page type. |
| `app/[[...slug]]/page.jsx` | Wires metadata and schema into each route. |
| `app/sitemap.xml`, `app/robots.txt`, `app/llms.txt` | Crawl and AI-discovery files. |
| `tests/seo.test.mjs` | Guards canonicals, duplicate titles, snippet lengths, noindex rules and schema. |

## Technical SEO fixes
- **Canonicals:** 29 hotel, tour and vehicle pages used to declare the listing page (`/hotels/`, `/tours/`, `/rent-a-car/`) as canonical, which kept them out of Google. Every page is now self-canonical.
- **Legacy duplicates** (old `/product/...` and post copies of hotels, and `-2` page copies) now point their canonical to the main page and are left out of the sitemap.
- **Titles and descriptions:** unique on every indexable page, at most 65 characters for titles and about 155 for descriptions. Copy-pasted legacy SEO fields are ignored, and readable fallbacks are generated from the page content.
- **Noindex:** theme demo items (lorem ipsum, "Apartment in Wellington", "Singapore Cable Car" and similar) and empty product stubs are noindexed. Search and filter URLs (`?q=`) are noindex, follow.
- **Headings:** one `<h1>` per page. `<h1>`s inside imported content are demoted to `<h2>`, duplicate title headings and pasted breadcrumb lists are removed, and visible breadcrumbs are added.
- **Sitemap:** 95 URLs with `<lastmod>` and image entries, including the home, listing and destination pages. `/destination/malakandi/` permanently redirects (308) to `/destination/malkandi/`.
- **Open Graph and Twitter** images on every page, `en_PK` locale, `max-image-preview:large`, and `lang="en-PK"`.
- **Content images** are lazy-loaded with `decoding="async"`.

## Structured data (JSON-LD @graph)
- **Every page:** TravelAgency + LocalBusiness (address, geo, phone, email, 24/7 hours, area served, price range, contact point), WebSite with SearchAction, WebPage with speakable, and BreadcrumbList.
- **By page type:**
  - Home: TouristDestination (Shogran) + FAQPage
  - Hotels: Hotel (geo, star rating, check-in/out, amenities, room offers)
  - Tours: TouristTrip + Product (itinerary, PKR offer) + FAQPage
  - Vehicles: Product + Car with photos, otherwise a car-rental Service
  - Blog: BlogPosting, plus the FAQPage blocks already written inside the posts
  - Destinations: TouristAttraction + FAQPage
  - Listings: CollectionPage + ItemList
- A crawl of all 95 sitemap URLs found 0 problems: no broken internal links, every FAQ question is visible on its page, and all required fields are present.

## AEO / GEO / AI search
- A **"What is Shogran?" answer box** on the home page, with a quick-facts table.
- A **9-question FAQ** with direct answers that link to the full guides.
- **Destination pages** now have a summary, key facts, FAQs and links to the guides (they used to show a photo only).
- **Consistent facts everywhere:** 7,749 ft, ≈250 km / 5–6 h from Islamabad, Siri Paye 8–10 km, best time May–Sep. The old "4–5 hours" figure was corrected.
- **`/llms.txt`:** a Markdown brief for ChatGPT, Claude, Perplexity and Gemini covering business details, facts, every hotel, tour, car, destination and guide, and the FAQ.
- **`robots.txt`** explicitly allows search and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others) and keeps the private areas blocked.

## Owner action list (cannot be done in code)
1. **Google Business Profile:** create or verify "Shogran Valley" at Main Shogran Bazar, Shogran, using exactly the same name, phone (+92 343 5853835) and address. Choose the category *Travel agency* and add photos. Then add the profile URL and your social profiles to `BUSINESS.sameAs` in `lib/knowledge.mjs`.
2. **Google Search Console and Bing Webmaster Tools:** submit `https://shogranvalley.com/sitemap.xml`. Bing also feeds ChatGPT and Copilot search.
3. **Vehicle photos:** upload them for 16 vehicles. With photos they switch to Product schema and can get price snippets.
4. **Blog images:** add featured images to 33 blog posts that have none.
5. **Terms & Conditions:** the page is theme demo text (lorem ipsum). Replace it with your real terms; it stays noindexed until then.
6. **Demo products:** delete the 6 demo WooCommerce products in Admin (Wellington, Downey, Village, Office Space, Singapore Cable Car, Rock Royalty).
7. **Honda BRV New:** this listing has placeholder text ("Description Rate per day…") and duplicates "Honda BR-V". Write a description or unpublish one of them.
8. **Destination facts:** check the short summaries for Manna Meadows, Malkandi and Shinkiari Hut in `lib/knowledge.mjs`.
9. **Existing installations:** settings live in SQLite. In Admin → Site settings, change the About stat "4-5 hrs" to "5-6 hrs" (the seed file is already updated).
10. **Reviews:** ask guests for genuine Google reviews. Do not add self-written review or rating schema.
