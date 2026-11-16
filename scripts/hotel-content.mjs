// Structured hotel descriptions (with headings) and FAQs for every hotel page.
// Usage: node scripts/hotel-content.mjs --seed   (updates data/seed.json)
//        DATA_DIR=... node scripts/hotel-content.mjs --db [--dry]   (updates the live SQLite state)
import fs from 'node:fs';

const BOOK = '<p><strong>Book now:</strong> send your dates and number of guests on WhatsApp or call <a href="https://wa.me/923435853835">+92 343 5853835</a>, or use the booking form on this page. Our Shogran-based team confirms availability first, then shares your invoice before any payment.</p>';

export const HOTELS = {
 'pine-park-hotel-and-resorts': {
  checkout: '12:00 PM',
  description: `<p><strong>Pine Park Hotel and Resorts</strong> is a 3-star family resort in <strong>Shogran, Kaghan Valley</strong> (Mansehra District, Khyber Pakhtunkhwa), set among tall pine forest at about <strong>7,749 ft (2,362 m)</strong>. It has <strong>five room types from PKR 20,500 to PKR 28,500 per night</strong>, each sleeping up to 4 guests, plus heating, hot water, a restaurant, bonfire and BBQ evenings, and jeep bookings for <strong>Siri Paye Meadows</strong>, about 8-10 km above Shogran.</p>
<h3>Why stay at Pine Park Shogran</h3>
<ul>
<li><strong>Forest setting with valley views:</strong> the resort sits among pines on the Shogran plateau, with mountain and valley views from the grounds.</li>
<li><strong>Rooms for families and groups:</strong> every room type has a double bed and a sofa bed for up to 4 guests.</li>
<li><strong>Warm in cold months:</strong> heating, hot water and generator backup are listed, which matters at this altitude.</li>
<li><strong>Easy Siri Paye trips:</strong> the hotel can arrange the local 4×4 jeep for the meadow, so you do not need to find one yourself.</li>
<li><strong>On-site food:</strong> a restaurant and room service serving Pakistani dishes, with BBQ and bonfire evenings in the garden.</li>
</ul>
<h3>Pine Park rooms and rates</h3>
<table>
<thead><tr><th>Room type</th><th>Beds</th><th>Guests</th><th>From, per night</th></tr></thead>
<tbody>
<tr><td>Standard Room</td><td>1 double, 1 sofa bed</td><td>Up to 4</td><td>PKR 20,500</td></tr>
<tr><td>Luxury Room</td><td>1 double, 1 sofa bed</td><td>Up to 4</td><td>PKR 24,500</td></tr>
<tr><td>VIP Room, 1st floor</td><td>1 double, 1 sofa bed</td><td>Up to 4</td><td>PKR 25,500</td></tr>
<tr><td>Luxury Main Block</td><td>1 double, 1 sofa bed</td><td>Up to 4</td><td>PKR 28,500</td></tr>
<tr><td>VIP/Executive, 2nd floor</td><td>1 double, 1 sofa bed</td><td>Up to 4</td><td>PKR 28,500</td></tr>
</tbody>
</table>
<h3>Location and how to reach Pine Park</h3>
<p>Pine Park is in Shogran itself, about <strong>250 km from Islamabad (5-6 hours)</strong>. The route runs on the Hazara Motorway to Mansehra, then through Balakot (the last reliable ATM) to Kiwai, where a steep 7-9 km road climbs to Shogran. Any healthy car manages the climb in dry weather; in rain or snow, use a 4×4 or leave your car at Kiwai and take a local jeep up.</p>
<h3>Things to do near the hotel</h3>
<ul>
<li><a href="/destination/siri-paye/">Siri Paye Meadows</a>: about 45-60 minutes by jeep, usually open from about May to October.</li>
<li>Pine forest walks around Shogran, easy for children and older guests.</li>
<li><a href="/destination/kawai-waterfall/">Kawai Waterfall</a> and <a href="/destination/sharan-forest/">Sharan Forest</a> on a half-day outing.</li>
<li>Naran, about 60 km up the valley (2-2.5 hours), and Lake Saif-ul-Malook beyond it.</li>
</ul>
<h3>Check-in, payment and cancellation</h3>
<p>Check-in is from <strong>1:00 PM</strong> and check-out is by <strong>12:00 PM (noon)</strong>. A <strong>50% advance</strong> secures the room, and cancellation is <strong>free up to 48 hours before arrival</strong>.</p>
${BOOK}`,
  faqs: [
   ['Where is Pine Park Hotel and Resorts located?', 'Pine Park is in Shogran, Kaghan Valley, Mansehra District, Khyber Pakhtunkhwa, Pakistan, among pine forest at about 7,749 ft (2,362 m).'],
   ['How much does a room cost at Pine Park Shogran?', 'Rooms start at PKR 20,500 per night for a Standard Room and go up to PKR 28,500 for the Luxury Main Block and VIP/Executive rooms. Every room sleeps up to 4 guests.'],
   ['What are the check-in and check-out times at Pine Park?', 'Check-in is from 1:00 PM and check-out is by 12:00 PM (noon).'],
   ['How far is Siri Paye from Pine Park Hotel?', 'Siri Paye is about 8-10 km above Shogran, roughly 45-60 minutes by local 4×4 jeep. The hotel and our team can arrange the jeep.'],
   ['How far is Pine Park Shogran from Islamabad?', 'About 250 km, or 5-6 hours by road via the Hazara Motorway, Mansehra, Balakot and Kiwai.']
  ]
 },
 'grand-vista-hotel-shogran': {
  checkout: '12:00 PM',
  description: `<p><strong>Grand Vista Hotel Shogran</strong> is a quiet 3-star resort in the pine forests of <strong>Shogran, Kaghan Valley</strong>, at about <strong>7,749 ft (2,362 m)</strong>. Its <strong>Standard Room</strong> (1 double bed, 2 guests) costs about <strong>PKR 28,000 per night</strong>, the same on weekends and in peak season, with breakfast, hot water, room service, a restaurant, free parking and mountain views. It suits couples, honeymooners and small families who want a calm base for <strong>Siri Paye</strong>.</p>
<h3>Why guests choose Grand Vista</h3>
<ul>
<li><strong>Calm forest setting:</strong> large windows look out over pine-covered hills, away from the busiest part of the bazaar.</li>
<li><strong>Breakfast listed:</strong> a good start before a jeep trip to Siri Paye.</li>
<li><strong>Hot water around the clock:</strong> a real comfort at this altitude, backed by a generator.</li>
<li><strong>Personal service:</strong> staff help with jeeps, trail directions and dinner plans.</li>
<li><strong>Good for couples:</strong> a peaceful choice for a honeymoon or anniversary trip.</li>
</ul>
<h3>Rooms and rates</h3>
<table>
<thead><tr><th>Room</th><th>Beds</th><th>Guests</th><th>Rate per night</th></tr></thead>
<tbody><tr><td>Standard Room</td><td>1 double bed</td><td>Up to 2</td><td>About PKR 28,000 (weekday, weekend and peak)</td></tr></tbody>
</table>
<h3>Facilities</h3>
<p>Breakfast, an on-site restaurant serving Pakistani food, room service, hot water, generator backup, laundry, a garden with bonfire and BBQ, free private parking, security and jeep bookings. Family rooms are listed for larger groups on request.</p>
<h3>Getting to Grand Vista</h3>
<p>Shogran is about <strong>250 km from Islamabad (5-6 hours)</strong> and about 600 km from Lahore (9-10 hours). Drive via Mansehra and Balakot to Kiwai, then climb 7-9 km to Shogran. Withdraw cash in Balakot, as there is no ATM in Shogran.</p>
<h3>Booking policy</h3>
<p>Check-in is from <strong>1:00 PM</strong> and check-out by <strong>12:00 PM</strong>. A <strong>50% advance</strong> confirms the booking, and cancellation is <strong>free up to 10 days before arrival</strong>, so book early and cancel in good time if plans change.</p>
${BOOK}`,
  faqs: [
   ['Where is Grand Vista Hotel Shogran located?', 'Grand Vista is in Shogran, a hill station in the Kaghan Valley, Mansehra District, Khyber Pakhtunkhwa, surrounded by pine forest at about 7,749 ft.'],
   ['How much is Grand Vista Hotel Shogran per night?', 'The Standard Room costs about PKR 28,000 per night for up to 2 guests, the same rate on weekdays, weekends and in peak season.'],
   ['Does Grand Vista include breakfast?', 'Breakfast is listed among the hotel facilities. Our team confirms the meal plan with your invoice.'],
   ['Is Grand Vista Hotel good for a honeymoon?', 'Yes. Its quiet forest setting, mountain views and double rooms for two make it a popular choice for couples.'],
   ['What is the cancellation policy at Grand Vista?', 'Cancellation is free up to 10 days before arrival. A 50% advance confirms the booking.']
  ]
 },
 'skyview-shogran': {
  checkout: '12:00 PM',
  description: `<p><strong>Sky View Hotel and Family Resort</strong> is a family-friendly hotel in the heart of <strong>Shogran, Kaghan Valley</strong>, near the forest house and within walking distance of the Shogran forest. <strong>Deluxe rooms</strong> (up to 3 guests) cost about <strong>PKR 13,500</strong> and <strong>Luxury rooms</strong> (up to 4 guests, king bed) about <strong>PKR 15,500 per night</strong>, with breakfast, heating, hot water and a restaurant listed. Siri Paye is about 8 km away by jeep.</p>
<h3>Why stay at Sky View</h3>
<ul>
<li><strong>Central Shogran location</strong> with easy access to the Siri Paye jeep track.</li>
<li><strong>Family rooms</strong> for couples, families and small groups.</li>
<li><strong>Valley and forest views</strong> from rooms and common areas.</li>
<li><strong>Breakfast, heating and hot water</strong> listed, useful in cool mountain evenings.</li>
<li><strong>Same rate all season:</strong> the listed price does not rise on weekends or in peak season.</li>
</ul>
<h3>Location and nearby attractions</h3>
<p>Sky View is in Shogran at about 7,749 ft, roughly <strong>250 km (5-6 hours) from Islamabad</strong> via Mansehra, Balakot and Kiwai. From the hotel you can walk into the Shogran forest, take a jeep to <a href="/destination/siri-paye/">Siri Paye Meadows</a>, and visit <a href="/destination/kawai-waterfall/">Kawai Waterfall</a> on the way up or down.</p>
<h3>Facilities</h3>
<p>Wi-Fi, breakfast, restaurant, room service, generator backup, hot water, heating, TV, garden, bonfire and BBQ, parking, security and jeep bookings.</p>
<h3>Check-in, payment and cancellation</h3>
<p>Check-in from <strong>1:00 PM</strong>, check-out by <strong>12:00 PM (noon)</strong>. A <strong>30% advance</strong> confirms the room and cancellation is <strong>free up to 4 days before arrival</strong>.</p>
${BOOK}`,
  faqs: [
   ['Where is Sky View Hotel Shogran located?', 'Sky View is in Shogran, Kaghan Valley, Mansehra District, Khyber Pakhtunkhwa, near the forest house and within walking distance of the Shogran forest.'],
   ['Is Sky View Hotel suitable for families?', 'Yes. Sky View is a family resort with Deluxe rooms for up to 3 guests and Luxury rooms for up to 4.'],
   ['What advance payment does Sky View need?', 'A 30% advance confirms the booking. Our team shares the invoice on WhatsApp first.'],
   ['What are the check-in and check-out times at Sky View?', 'Check-in is from 1:00 PM and check-out is by 12:00 PM (noon).']
  ]
 },
 'parbat-view-hotel-paras': {
  checkout: '12:00 PM',
  description: `<p><strong>Parbat View Hotel and River Restaurant</strong> is a budget riverside hotel in <strong>Paras, Kaghan Valley</strong>, beside the Kunhar River on the main Balakot to Naran road. Rooms sleep up to 4 guests and cost about <strong>PKR 8,000 per night</strong> all season, with Wi-Fi, generator backup and a river-view restaurant. It is a good base for <strong>Sharan Forest</strong>, a stopover on the way to Naran, or a cheaper alternative to staying in Shogran.</p>
<h3>Why stay at Parbat View</h3>
<ul>
<li><strong>Right beside the Kunhar River,</strong> with the sound of the water from the rooms and restaurant.</li>
<li><strong>River Restaurant</strong> serving Pakistani dishes, with trout often on the menu in season.</li>
<li><strong>Budget family rooms</strong> for up to 4 guests at one flat rate.</li>
<li><strong>On the main valley road,</strong> so no steep climb is needed to reach the hotel.</li>
<li><strong>Jeep trips to Sharan Forest</strong> start from Paras.</li>
</ul>
<h3>Rooms and rates</h3>
<table>
<thead><tr><th>Room</th><th>Beds</th><th>Guests</th><th>Rate per night</th></tr></thead>
<tbody>
<tr><td>Standard Room</td><td>1 double bed</td><td>Up to 4</td><td>About PKR 8,000</td></tr>
<tr><td>Deluxe Room, 1st floor</td><td>1 double bed and 2 mattresses</td><td>Up to 4</td><td>About PKR 8,000</td></tr>
</tbody>
</table>
<h3>Location and nearby places</h3>
<p>Paras lies a short drive beyond Kiwai, the turn-off for Shogran. From the hotel you can take a jeep up to <a href="/destination/sharan-forest/">Sharan Forest</a>, drive back to Kiwai for <a href="/hotels/">Shogran</a> and Siri Paye, or continue north to Kaghan, Naran and Lake Saif-ul-Malook.</p>
<h3>Check-in, payment and cancellation</h3>
<p>Check-in from <strong>1:00 PM</strong>, check-out by <strong>12:00 PM (noon)</strong>. A <strong>20% advance</strong> confirms the booking, and cancellation is <strong>free up to 48 hours before arrival</strong>.</p>
${BOOK}`,
  faqs: [
   ['Where is Parbat View Hotel located?', 'In Paras, Kaghan Valley, Mansehra District, Khyber Pakhtunkhwa, beside the Kunhar River on the main Balakot to Naran road.'],
   ['Does Parbat View have a restaurant?', 'Yes. The River Restaurant serves Pakistani food with views over the Kunhar River.'],
   ['Is Parbat View a good stop on the way to Naran?', 'Yes. Paras is on the main road between Balakot and Naran, so the hotel is easy to reach and makes a convenient overnight stop.'],
   ['How much advance does Parbat View need?', 'A 20% advance confirms the booking, and cancellation is free up to 48 hours before arrival.']
  ]
 },
 'fairyland-hotel-restaurant-malakandi-kaghan': {
  description: `<p><strong>Fairyland Hotel and Restaurant</strong> is a river-view hotel in <strong>Malakandi, on the Naran road in the Kaghan Valley</strong>. Its <strong>Deluxe rooms</strong> sleep up to 4 guests and cost about <strong>PKR 12,000 per night on weekdays</strong> and about <strong>PKR 14,000 on weekends and in peak season</strong>. Rooms have hot water, TV and room service, and the in-house restaurant cooks local and Pakistani food every day.</p>
<h3>Why stay at Fairyland</h3>
<ul>
<li><strong>Kunhar River views</strong> from clean, spacious rooms.</li>
<li><strong>Quiet village setting</strong> in Malakandi, away from the crowds of Naran.</li>
<li><strong>Family-sized rooms</strong> for up to 4 guests.</li>
<li><strong>Fresh meals daily</strong> at the in-house restaurant, from morning chai to dinner.</li>
<li><strong>Central for day trips</strong> to Shogran, Siri Paye, Sharan Forest and Manoor Valley.</li>
</ul>
<h3>Dining at Fairyland</h3>
<p>The restaurant serves local and traditional Pakistani dishes, freshly prepared each day, so you can eat well after a long day out without driving anywhere.</p>
<h3>Location and nearby places</h3>
<p>Malakandi sits on the main valley road past Paras, toward Kaghan town and Naran. From here you can reach Shogran (via Kiwai), Sharan Forest and Manoor Valley on day trips, or continue up the valley to Naran.</p>
<h3>Check-in, payment and cancellation</h3>
<p>Check-in from <strong>12:00 PM</strong>, check-out by <strong>11:00 AM</strong>. A <strong>50% advance</strong> confirms the room and cancellation is <strong>free up to 48 hours before arrival</strong>.</p>
${BOOK}`,
  faqs: [
   ['Where is Fairyland Hotel Malakandi?', 'On Naran Road in Malakandi, Kaghan Valley, Mansehra District, Khyber Pakhtunkhwa, with views of the Kunhar River.'],
   ['How much does Fairyland Hotel cost per night?', 'Deluxe rooms cost about PKR 12,000 per night on weekdays and about PKR 14,000 on weekends and in peak season, for up to 4 guests.'],
   ['Does Fairyland Hotel have a restaurant?', 'Yes. The in-house restaurant serves fresh local and Pakistani food every day.'],
   ['What are the check-in and check-out times at Fairyland?', 'Check-in is from 12:00 PM and check-out is by 11:00 AM.']
  ]
 },
 'pine-wood-hotel': {
  description: `<p><strong>Pine Wood Hotel and Family Cottage</strong> is a budget riverside stay in <strong>Malakandi, on the Naran road in the Kaghan Valley</strong>, close to the Kunhar River and the Malakandi forest. Its <strong>Standard Rooms</strong> have a double and a single bed for up to 4 guests at about <strong>PKR 8,000 per night</strong>, the same rate all season. It is pet friendly, has a restaurant and room service, and suits families who want a simple, affordable base for the valley.</p>
<h3>Why stay at Pine Wood</h3>
<ul>
<li><strong>One of the most affordable family stays</strong> on our list, with one flat rate all season.</li>
<li><strong>Riverside setting</strong> near the Kunhar River and the Malakandi forest.</li>
<li><strong>Pets welcome,</strong> which few hotels in the valley allow.</li>
<li><strong>Garden, bonfire and BBQ</strong> for relaxed evenings.</li>
<li><strong>Jeep bookings</strong> for Shogran, Siri Paye and Sharan.</li>
</ul>
<h3>Room and rate</h3>
<table>
<thead><tr><th>Room</th><th>Beds</th><th>Guests</th><th>Rate per night</th></tr></thead>
<tbody><tr><td>Standard Room</td><td>1 double, 1 single bed</td><td>Up to 4</td><td>About PKR 8,000</td></tr></tbody>
</table>
<h3>Facilities</h3>
<p>Restaurant, room service, generator backup, garden, bonfire and BBQ, parking, security, family rooms, jeep bookings and pet-friendly rooms. Mountain and valley views from the property.</p>
<h3>Nearby places</h3>
<p>The Kunhar River, Mahandri and the Malakandi forest are close by. Shogran and Siri Paye are reached via Kiwai, and Naran is further up the main road.</p>
<h3>Check-in, payment and cancellation</h3>
<p>Check-in and check-out are at <strong>12:00 PM</strong>. A <strong>50% advance</strong> confirms the booking and cancellation is <strong>free up to 48 hours before arrival</strong>.</p>
${BOOK}`,
  faqs: [
   ['Is Pine Wood Hotel pet friendly?', 'Yes. Pets are listed as welcome at Pine Wood. Mention your pet when you book so the team can prepare.'],
   ['Does Pine Wood Hotel have a restaurant?', 'Yes. Pine Wood has a restaurant and room service, plus a garden for bonfire and BBQ evenings.'],
   ['What are the check-in and check-out times at Pine Wood?', 'Check-in and check-out are both at 12:00 PM (noon).']
  ]
 }
};

const DASH = /[–—]/;
export function apply(data){
 const recs = Array.isArray(data.records) ? data.records : Object.values(data.records);
 const done = [];
 const now = new Date().toISOString().slice(0,19).replace('T',' ');
 for (const [slug, h] of Object.entries(HOTELS)) {
  const r = recs.find(x => x.type === 'sv_hotel' && x.slug === slug);
  if (!r) { done.push(slug + ': NOT FOUND'); continue; }
  for (const s of [h.description, ...h.faqs.flat()]) if (DASH.test(s)) throw new Error('long dash in ' + slug);
  r.meta._sv3_h_description = h.description;
  r.meta._sv3_h_faqs_json = JSON.stringify(h.faqs.map(([q, a]) => ({ q, a })));
  if (h.checkout) r.meta._sv3_h_checkout_time = h.checkout;
  r.modified = now;
  done.push(slug + ': ok');
 }
 return done;
}

if (process.argv.includes('--seed')) {
 const f = new URL('../data/seed.json', import.meta.url);
 const data = JSON.parse(fs.readFileSync(f, 'utf8'));
 console.log(apply(data).join('\n'));
 fs.writeFileSync(f, JSON.stringify(data));
}
if (process.argv.includes('--db')) {
 const { updateData, readData } = await import('../lib/store.mjs');
 if (process.argv.includes('--dry')) console.log(apply(readData()).join('\n'));
 else console.log(updateData(apply).join('\n'));
}
