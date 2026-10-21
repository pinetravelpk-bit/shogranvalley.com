/*
 * Shogran Valley — verified knowledge base.
 * Single source of truth for local-business details, quick facts, FAQs and destination guides.
 * Used for visible "quick answer" blocks, FAQ sections, JSON-LD, llms.txt and meta descriptions,
 * so search engines and AI answer engines see the same consistent facts everywhere.
 * Facts are taken from the site's own published guides (2026) and cross-checked against
 * Wikipedia (Shogran: 34.633 N, 73.467 E, 2,362 m; Payee Lake: 34.6153 N, 73.4867 E).
 * Edit here when anything changes.
 */

export const BUSINESS = {
  legalName: 'Shogran Valley',
  alternateName: ['ShogranValley.com', 'Shogran Valley Travel & Hotels'],
  slogan: 'Hotels, tours and 4×4 jeeps in Shogran, Siri Paye & Kaghan Valley',
  streetAddress: 'Main Shogran Bazar',
  locality: 'Shogran',
  subRegion: 'Mansehra District',
  region: 'Khyber Pakhtunkhwa',
  regionCode: 'PK-KP',
  country: 'PK',
  countryName: 'Pakistan',
  geo: { latitude: 34.633, longitude: 73.467 },
  elevation: { feet: 7749, metres: 2362 },
  telephoneDisplay: '+92 343 5853835',
  priceRange: 'PKR 6,000 – 55,000',
  currenciesAccepted: 'PKR',
  paymentAccepted: ['Cash', 'Bank transfer'],
  languages: ['English', 'Urdu'],
  openingHours: '24/7 support on WhatsApp, phone and email',
  areaServed: ['Shogran', 'Siri Paye', 'Kiwai', 'Paras', 'Sharan Forest', 'Kaghan', 'Naran', 'Balakot', 'Kaghan Valley', 'Mansehra District', 'Islamabad', 'Lahore'],
  knowsAbout: ['Shogran hotels', 'Siri Paye jeep tours', 'Kaghan Valley tours', 'Naran tours', 'Rent a car for northern Pakistan', '4x4 jeep rental Shogran', 'Honeymoon tours Pakistan', 'Family tours Kaghan'],
  // Add official profile URLs here (Facebook, Instagram, YouTube, TikTok, Google Business Profile).
  sameAs: [],
};

export const QUICK_FACTS = [
  ['Location', 'Kaghan Valley, Mansehra District, Khyber Pakhtunkhwa, Pakistan'],
  ['Altitude', '7,749 ft (2,362 m)'],
  ['From Islamabad', '≈ 250 km · 5–6 hours by road'],
  ['Last stretch', '7–9 km climb from Kiwai on the Kaghan road'],
  ['Siri Paye', '8–10 km above Shogran · 4×4 jeep, 45–60 min'],
  ['Best time', 'May to September'],
  ['Snow season', 'December to February'],
  ['Cash', 'No ATM in Shogran. The last ATM is in Balakot'],
];

export const SHOGRAN_SUMMARY =
  'Shogran is a hill station and pine-forested plateau in the Kaghan Valley, Mansehra District, Khyber Pakhtunkhwa, Pakistan, at 7,749 ft (2,362 m). It sits above Kiwai on the Kaghan road, about 250 km (5–6 hours) from Islamabad, and is the base for jeep trips to the Siri Paye meadows 8–10 km above it.';

export const HOME_FAQ = [
  { q: 'Where is Shogran located?', a: 'Shogran is in the Kaghan Valley, Mansehra District, Khyber Pakhtunkhwa, northern Pakistan, at 7,749 ft (2,362 m). It sits above the settlement of Kiwai on the Kaghan road, about 43 km from Balakot and roughly 250 km from Islamabad.', href: '/where-is-shogran-located/' },
  { q: 'How far is Shogran from Islamabad and how long does it take?', a: 'Islamabad to Shogran is about 250 km and usually takes 5 to 6 hours. The route runs via the Hazara Motorway (E-35), Mansehra, Balakot and Kiwai, then a steep 7–9 km climb up to Shogran. Allow extra time in peak summer and in rain.', href: '/islamabad-to-shogran-distance/' },
  { q: 'What is the best time to visit Shogran?', a: 'May to September is the best time to visit Shogran. June usually has the clearest mornings for Siri Paye, July and August are the greenest but busiest and wettest, and September is quiet and clear. In winter the Siri Paye track closes.', href: '/best-time-to-visit-shogran/' },
  { q: 'Does Shogran get snow?', a: 'Yes. Shogran gets regular snowfall from December to February, sometimes into March. Heavy snow can block the climb from Kiwai on some days, so confirm road and hotel status before travelling in winter.', href: '/does-shogran-have-snow/' },
  { q: 'Can a normal car reach Shogran?', a: 'Usually yes, in dry weather. The final 7–9 km climb from Kiwai is steep with tight hairpins, so the car needs good brakes and a healthy engine. Siri Paye above Shogran can only be reached by 4×4 jeep or on foot.', href: '/is-shogran-accessible-by-car/' },
  { q: 'How far is Siri Paye from Shogran?', a: 'Siri Paye is about 8–10 km above Shogran at roughly 9,500 ft. The jeep track is rough, so the drive takes 45–60 minutes each way. On foot it takes about 3–4 hours uphill. Leave by 7 AM because clouds often settle over the meadow by late morning.', href: '/shogran-to-siri-paye-distance/' },
  { q: 'How far is Naran from Shogran?', a: 'Naran is about 60 km from Shogran and takes 2 to 2½ hours. The route goes back down to Kiwai, then up the Kaghan road through Paras and Kaghan town.', href: '/shogran-to-naran-distance/' },
  { q: 'Are there ATMs in Shogran?', a: 'No. Shogran has no ATM. The last reliable ATM is in Balakot, so carry enough cash in Pakistani rupees for hotels, jeeps and food.', href: '/shogran-trip-cost/' },
  { q: 'How do I book a hotel, tour or jeep with Shogran Valley?', a: 'Choose a hotel, tour or vehicle on shogranvalley.com and send a booking enquiry, or message us on WhatsApp at +92 343 5853835. Sending an enquiry is free and takes no payment. Our team confirms availability and the final rate with you.', href: '/book/' },
];

export const DESTINATIONS = [
  {
    slug: 'siri-paye', name: 'Siri Paye Meadows', img: 'siri-paye.jpg', type: 'TouristAttraction',
    geo: { latitude: 34.6153, longitude: 73.4867 },
    summary: 'Siri Paye is a high alpine meadow about 8–10 km above Shogran, at roughly 9,500 ft, in the Kaghan Valley of Khyber Pakhtunkhwa. The only practical way up is a 4×4 jeep on a rough track, about 45–60 minutes each way. On a clear morning the small lakes of Siri and Paye reflect Makra Peak.',
    facts: [['Altitude', '≈ 9,500 ft (≈ 2,900 m)'], ['Distance from Shogran', '8–10 km'], ['Access', '4×4 jeep (45–60 min) or a 3–4 hour hike'], ['Season', 'Track usually open around May to October'], ['Best time of day', 'Leave Shogran by 7 AM']],
    faqs: [
      { q: 'How do you get to Siri Paye?', a: 'Hire a local 4×4 jeep from Shogran. The rough 8–10 km track takes about 45–60 minutes each way. Ordinary cars cannot make the climb.' },
      { q: 'When is the Siri Paye track open?', a: 'The jeep track is seasonal. It is usually open from around May to October and closed by snow in winter.' },
      { q: 'What is the best time of day to visit Siri Paye?', a: 'Go early. Leave Shogran by about 7 AM, because cloud regularly closes in over the meadow by late morning.' },
    ],
    guides: ['/siri-paye-shogran/', '/shogran-to-siri-paye-distance/', '/siri-paye-meadows-guide/'],
  },
  {
    slug: 'sharan-forest', name: 'Sharan Forest', img: 'sharan-forest.jpg', type: 'TouristAttraction',
    summary: 'Sharan Forest is a dense pine, fir, spruce and deodar forest above the village of Paras in the Kaghan Valley. A steep jeep track climbs to the Sharan rest area at roughly 2,500 m. It is quieter than Siri Paye and known for forest huts, camping and walking trails.',
    facts: [['Where', 'Above Paras, off the Kaghan–Naran road'], ['Altitude', '≈ 2,500 m at the rest area'], ['Access', '4×4 jeep from Paras with a local driver'], ['Best season', 'May to September'], ['Stay', 'Forest rest house, huts and camping']],
    faqs: [
      { q: 'How do you reach Sharan Forest?', a: 'From Balakot, follow the Kaghan road to Paras. A rough, steep track then climbs to Sharan through dense forest. A 4×4 jeep with an experienced local driver is the standard and safest way up.' },
      { q: 'Can I visit Sharan Forest from Shogran?', a: 'Yes, as a day trip. Drive down to Kiwai, continue along the valley to Paras, then take the jeep track up to Sharan. Many visitors combine it with Malkandi Forest.' },
      { q: 'Where can you stay in Sharan?', a: 'Sharan has a forest rest house, hut-style rooms and camping spots. Book in advance in summer.' },
    ],
    guides: ['/sharan-forest-guide/', '/2-days-shogran-and-sharan-forest-tour/'],
  },
  {
    slug: 'kawai-waterfall', name: 'Kawai Waterfall', img: 'kawai-waterfall.jpg', type: 'TouristAttraction',
    summary: 'Kawai (Kiwai) Waterfall is right beside the Kaghan road at Kiwai, at the bottom of the 7–9 km climb to Shogran. Travellers pass it on the way in and out, so it is an easy stop of 30–60 minutes with tea stalls nearby.',
    facts: [['Where', 'Kiwai, on the Kaghan road below Shogran'], ['From Balakot', '≈ 34 km'], ['From Shogran', '7–9 km downhill'], ['Access', 'Roadside, no jeep needed'], ['Time needed', '30–60 minutes']],
    faqs: [
      { q: 'Where is Kawai Waterfall?', a: 'It is at Kiwai on the Kaghan road, where the climb to Shogran begins, about 34 km from Balakot along the Kunhar river.' },
      { q: 'Do you need a jeep for Kawai Waterfall?', a: 'No. The waterfall is next to the main road, so any car can stop there on the way to Shogran or Naran.' },
    ],
    guides: ['/what-to-see-in-shogran/', '/shogran-map-location-guide/'],
  },
  {
    slug: 'malkandi', name: 'Malkandi Forest', img: 'malkandi-forest.jpg', type: 'TouristAttraction', aliases: ['malakandi'],
    summary: 'Malkandi (Malakandi) is a forested stretch of the Kaghan Valley near Sharan, reached via Paras on the road towards Naran. It is often combined with a Sharan Forest day trip. Riverside hotels such as Fairyland Hotel Malakandi make it a quieter base than Shogran or Naran.',
    facts: [['Where', 'Kaghan Valley, via Paras on the Naran road'], ['Combine with', 'Sharan Forest'], ['Best season', 'May to September'], ['Stay', 'Riverside hotels in Malakandi village']],
    faqs: [
      { q: 'How do you get to Malkandi from Shogran?', a: 'Drive down to Kiwai, then follow the Kaghan road up the valley through Paras towards Malakandi. Most visitors pair it with Sharan Forest.' },
    ],
    guides: ['/what-to-see-in-shogran/', '/hotels/fairyland-hotel-restaurant-malakandi-kaghan/'],
  },
  {
    slug: 'manna-meadows', name: 'Manna Meadows', img: 'manna-meadows.jpg', type: 'TouristAttraction',
    summary: 'Manna Meadows is a quiet high pasture near Shogran, surrounded by pine forest and mountain views. It gets far fewer visitors than Siri Paye. It is usually done as a full-day jeep-and-trek trip from Shogran Bazar and suits trekkers, photographers and anyone looking for solitude.',
    facts: [['Start point', 'Shogran Bazar'], ['Access', 'Jeep plus a short trek'], ['Trip length', 'Full day'], ['Best season', 'May to September'], ['Good for', 'Trekking, photography, picnics']],
    faqs: [
      { q: 'Is Manna Meadows better than Siri Paye?', a: 'It is quieter rather than better. Siri Paye has the famous lakes and views of Makra Peak, while Manna Meadows offers solitude and fewer crowds. With 2–3 nights in Shogran you can do both.' },
    ],
    guides: ['/manna-meadows-explorer-tour/', '/what-to-see-in-shogran/'],
  },
  {
    slug: 'shinkiari-hut', name: 'Shinkiari Hut', img: '', type: 'TouristAttraction',
    summary: 'Shinkiari Hut is a quiet forest stop in the Paras area of the Kaghan Valley, near Sharan Forest, Manna Meadows and Malakandi. Access depends on the season and track conditions, so ask our team on WhatsApp before you plan a visit.',
    facts: [['Area', 'Paras, Kaghan Valley'], ['Nearby', 'Sharan Forest, Malakandi, Shogran'], ['Access', 'Local jeep; check conditions first']],
    faqs: [],
    guides: ['/what-to-see-in-shogran/'],
  },
  {
    slug: 'naran', name: 'Naran', img: '', type: 'City', hidden: true,
    summary: 'Naran is the main town of the upper Kaghan Valley, about 60 km (2–2½ hours) beyond Shogran on the Kaghan road. It is the gateway to Lake Saif-ul-Malook and, in summer, to Babusar Top about 130 km from Shogran.',
    facts: [['From Shogran', '≈ 60 km · 2–2½ hours'], ['Gateway to', 'Lake Saif-ul-Malook, Babusar Top'], ['Babusar Top', 'Usually open about July to September/October']],
    faqs: [{ q: 'Can you visit Naran as a day trip from Shogran?', a: 'Yes. Naran is about 60 km away and takes 2–2½ hours each way, so a day trip is possible. An overnight stay is more comfortable if you also want Lake Saif-ul-Malook.' }],
    guides: ['/shogran-to-naran-distance/', '/naran-kaghan-tour-from-shogran/'],
  },
];

export const visibleDestinations = DESTINATIONS.filter(d => !d.hidden);
export function destinationBySlug(slug) {
  return DESTINATIONS.find(d => d.slug === slug || (d.aliases || []).includes(slug)) || null;
}
