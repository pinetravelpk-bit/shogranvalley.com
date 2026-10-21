import {readData} from '../../lib/store.mjs';import {publicRecords,plain,price,field,description,normalizePath} from '../../lib/content.mjs';import {canonicalPath,clip,businessPhone} from '../../lib/seo.mjs';import {BUSINESS,QUICK_FACTS,SHOGRAN_SUMMARY,HOME_FAQ,DESTINATIONS} from '../../lib/knowledge.mjs';
export const dynamic='force-dynamic';
// llms.txt (https://llmstxt.org): a plain-Markdown brief so AI assistants and answer engines describe and cite Shogran Valley accurately.
export function GET(){const d=readData(),site=d.settings.siteUrl.replace(/\/$/,''),s=d.settings;const all=publicRecords(d).filter(r=>canonicalPath(r,d)===r.path);const u=p=>site+p;
 const list=(type,fmt)=>all.filter(r=>r.type===type).map(fmt).join('\n');
 const pk=n=>n?`PKR ${Number(n).toLocaleString('en-PK')}`:'';
 const md=`# Shogran Valley

> ${SHOGRAN_SUMMARY} Shogran Valley (${site}) is a local travel company based in Main Shogran Bazar, Shogran, that books hotels, runs tour packages and rents cars, vans and 4×4 jeeps with drivers for Shogran, Siri Paye, Sharan Forest, Kaghan and Naran.

## Business details
- Name: ${BUSINESS.legalName}
- Address: ${BUSINESS.streetAddress}, ${BUSINESS.locality}, Kaghan Valley, ${BUSINESS.subRegion}, ${BUSINESS.region}, ${BUSINESS.countryName}
- Coordinates: ${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}
- Phone / WhatsApp: ${businessPhone(d)} (https://wa.me/${s.whatsapp})
- Email: ${s.email}
- Hours: ${BUSINESS.openingHours}
- Languages: ${BUSINESS.languages.join(', ')}
- Service area: ${BUSINESS.areaServed.join(', ')}
- Booking: free online enquiry at ${u('/book/')}. No payment is taken online, and the team confirms availability and the final price.

## Shogran quick facts
${QUICK_FACTS.map(([k,v])=>`- ${k}: ${v}`).join('\n')}

## Hotels
${list('sv_hotel',r=>`- [${plain(r.title)}](${u(r.path)}): ${plain(field(r,'city'))||'Kaghan Valley'}${price(r)?`, from ${pk(price(r))} per night`:''}`)}

## Tour packages
${list('sv_tour',r=>`- [${plain(r.title)}](${u(r.path)}): ${plain(field(r,'duration_label'))}${field(r,'departure')?` from ${plain(field(r,'departure'))}`:''}${price(r)?`, ${pk(price(r))} per person`:''}`)}

## Car and jeep rental
${list('sv_vehicle',r=>`- [${plain(r.title)}](${u(r.path)}): ${field(r,'capacity')||'?'} seats${price(r)?`, ${pk(price(r))} per day`:''}`)}

## Destinations
${DESTINATIONS.map(x=>`- [${x.name}](${u('/destination/'+x.slug+'/')}): ${x.summary}`).join('\n')}

## Travel guides
${all.filter(r=>r.type==='post').sort((a,b)=>String(b.modified||b.date).localeCompare(String(a.modified||a.date))).map(r=>`- [${plain(r.title)}](${u(r.path)}): ${clip(description(r),180)}`).join('\n')}

## Frequently asked questions
${HOME_FAQ.map(f=>`### ${f.q}\n${f.a} Source: ${u(f.href)}`).join('\n\n')}

## Optional
- [About Shogran Valley](${u('/about/')})
- [Terms and conditions](${u('/terms-and-condition/')})
- [XML sitemap](${u('/sitemap.xml')})
`;
 return new Response(md,{headers:{'Content-Type':'text/markdown; charset=utf-8','Cache-Control':'public, max-age=3600'}})}
