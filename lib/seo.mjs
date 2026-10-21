/*
 * SEO / AEO / GEO layer: page metadata, canonical rules, breadcrumbs and a JSON-LD @graph
 * for every page type. All business facts come from lib/knowledge.mjs.
 */
import {plain,field,json,imageFor,imageAlt,price,description,publicRecords,normalizePath} from './content.mjs';
import {BUSINESS,HOME_FAQ,SHOGRAN_SUMMARY,DESTINATIONS,visibleDestinations,destinationBySlug} from './knowledge.mjs';

export const BRAND='Shogran Valley';
export const DEFAULT_IMAGE={url:'/travel/shogran-clouds.jpg',width:1600,height:900,alt:'Clouds rolling over the pine-forested ridges of Shogran, Kaghan Valley'};
const LANG='en-PK';
const TYPE_ROOT={sv_hotel:['/hotels/','Hotels'],sv_tour:['/tours/','Tours'],sv_vehicle:['/rent-a-car/','Rent a Car'],post:['/blog/','Travel Guides']};
export const LISTINGS={
 '/hotels/':{name:'Hotels in Shogran & Kaghan Valley',title:'Hotels in Shogran, Kaghan & Naran: Compare Rates | Shogran Valley',description:'Compare hand-picked hotels in Shogran, Malakandi, Paras and the Kaghan Valley, with real photos, room rates per night and free booking enquiries. WhatsApp support 24/7.'},
 '/tours/':{name:'Shogran & Kaghan Valley Tours',title:'Shogran Tour Packages from Islamabad & Lahore | Shogran Valley',description:'Shogran, Siri Paye, Sharan Forest and Kaghan Valley tour packages from Islamabad and Lahore, with transport, hotel stays, jeep rides and a local guide. Prices per person.'},
 '/rent-a-car/':{name:'Rent a Car & 4×4 Jeeps for Shogran',title:'Rent a Car & 4×4 Jeep for Shogran, Kaghan & Naran | Shogran Valley',description:'Rent cars, vans, coasters and 4×4 jeeps with professional drivers for Shogran, Siri Paye, Kaghan and Naran. Daily rates and fixed one-way routes from Islamabad.'},
 '/blog/':{name:'Shogran Travel Guides',title:'Shogran Travel Guides: Weather, Distance, Snow & Tips | Shogran Valley',description:'Practical Shogran and Kaghan Valley travel guides: distances, road conditions, weather, snowfall, Siri Paye, hotels, trip costs and the best time to visit.'},
 '/book/':{name:'Book a Shogran Trip',title:'Book a Shogran Hotel, Tour or Jeep | Shogran Valley',description:'Send a free booking enquiry for hotels, tours and vehicles in Shogran and the Kaghan Valley. No payment needed; our team confirms availability on WhatsApp.'},
};

export const abs=(data,p)=>new URL(p||'/',data.settings.siteUrl).href;
const site=data=>data.settings.siteUrl.replace(/\/$/,'');
const ORG=data=>site(data)+'/#organization';
const phoneE164=s=>{const d=String(s||'').replace(/\D/g,'');if(!d)return '';if(d.startsWith('92'))return '+'+d;if(d.startsWith('0'))return '+92'+d.slice(1);return '+'+d};
export const businessPhone=data=>phoneE164(data.settings.shogran_phone||data.settings.whatsapp);
export function clip(s,n=158){s=plain(String(s||'')).replace(/\s+/g,' ').trim();if(s.length<=n)return s;const cut=s.slice(0,n);return cut.slice(0,cut.lastIndexOf(' ')).replace(/[\s,;:–—-]+$/,'')+'…'}
function trimTitle(t){t=plain(t).replace(/\s+/g,' ').trim();if(t.length<=65)return t;const short=t.replace(/\s*[|–—-]\s*Shogran Valley\s*$/i,'');if(short.length<=65)return short;return clip(short,62)}
const lastSeg=p=>String(p||'').replace(/\/+$/,'').split('/').pop();

/* ---------- legacy SEO fields: use only when unique (duplicates were copy/paste errors) ---------- */
const dupCache=new WeakMap();
function dups(data){if(dupCache.has(data))return dupCache.get(data);const t=new Map(),d=new Map();for(const r of publicRecords(data)){const m=r.meta||{};const lt=m._svseo_title||m.rank_math_title||m._yoast_wpseo_title;const ld=m._svseo_description||m.rank_math_description||m._yoast_wpseo_metadesc;if(lt)t.set(lt,(t.get(lt)||0)+1);if(ld)d.set(ld,(d.get(ld)||0)+1)}const v={t,d};dupCache.set(data,v);return v}
function legacy(r,data){const m=r.meta||{},{t,d}=dups(data);let title=m._svseo_title||m.rank_math_title||m._yoast_wpseo_title||'';let desc=m._svseo_description||m.rank_math_description||m._yoast_wpseo_metadesc||'';if(t.get(title)>1)title='';if(d.get(desc)>1||/Description Rate per day/i.test(plain(desc))||plain(desc).toLowerCase().startsWith(plain(r.title).toLowerCase()+' home')||/^\s*About Us Home/i.test(plain(desc)))desc='';title=title.replace(/%%title%%|%title%/g,r.title||'').replace(/%%sitename%%|%sitename%/g,BRAND).replace(/%%sep%%|%sep%/g,'|').replace(/%%?[^%]+%%?/g,'').replace(/Offical/g,'Official').trim();title=plain(title);if(title.replace(/\s*[|–—-]\s*Shogran Valley\s*$/i,'').length>65)title='';return {title,desc:plain(desc).trim()}}

/** The page that should be canonical for a record (consolidates legacy duplicates of hotels/tours/cars). */
export function canonicalPath(r,data){
 const pub=publicRecords(data);
 if(['post','product'].includes(r.type)){const s=lastSeg(r.path);const main=pub.find(x=>['sv_hotel','sv_tour','sv_vehicle'].includes(x.type)&&lastSeg(x.path)===s);if(main)return main.path}
 if(r.type==='product'){const s=lastSeg(r.path);const post=pub.find(x=>['post','page'].includes(x.type)&&lastSeg(x.path)===s);if(post)return canonicalPath(post,data)}
 const m=String(r.path).match(/^(.*)-\d+\/$/);if(m&&['post','page'].includes(r.type)){const base=pub.find(x=>x.type===r.type&&normalizePath(x.path)===normalizePath(m[1]+'/')&&x.content===r.content);if(base)return base.path}
 return r.path;
}

function autoTitle(r){const t=plain(r.title);switch(r.type){case 'sv_hotel':return `${t}: Rooms & Rates | ${BRAND}`;case 'sv_vehicle':return `${t} on Rent for Shogran & Kaghan | ${BRAND}`;default:return `${t} | ${BRAND}`}}
function autoDesc(r,data){const t=plain(r.title),p=price(r);
 if(r.type==='sv_hotel'){const am=json(field(r,'amenities_json')).slice(0,3).map(x=>String(x).replace(/_/g,' ')).join(', ');return clip(`${t} in ${plain(field(r,'city'))||'the Kaghan Valley'}${p?`: rooms from PKR ${p.toLocaleString('en-PK')} per night`:''}${am?`, with ${am}`:''}. See photos and policies, then send a free booking enquiry.`)}
 if(r.type==='sv_tour'){const inc=String(field(r,'includes')).split(/\r?\n/).filter(Boolean).slice(0,3).join(', ');return clip(`${t}: ${plain(field(r,'duration_label'))||'guided trip'} from ${plain(field(r,'departure'))||'Islamabad'}${p?`, from PKR ${p.toLocaleString('en-PK')} per person`:''}${inc?`. Includes ${inc}`:''}.`)}
 if(r.type==='sv_vehicle'){return clip(`Rent a ${t} for Shogran, Kaghan and Naran: ${field(r,'capacity')||'?'} seats, ${plain(field(r,'transmission'))||'manual'}${field(r,'driver')==='1'?', with driver':''}${p?`, from PKR ${p.toLocaleString('en-PK')} per day`:''}. One-way route rates from Islamabad.`)}
 const lc=r.content?leadText(r.content):'';return clip(lc.length>60?lc:leadText(description(r)))}
/** First real paragraphs of HTML (skips headings, breadcrumbs and scripts). */
export function leadText(html){const h=String(html||'').replace(/<script[\s\S]*?<\/script>|<nav[\s\S]*?<\/nav>/gi,'');const ps=[...h.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m=>plain(m[1]).trim()).filter(x=>x.length>40);return ps.length?ps.slice(0,2).join(' '):plain(h)}
/** Theme demo items (lorem ipsum, sample museum/office listings) and empty legacy product stubs are kept out of the index. */
export function isDemoOrThin(r){const text=plain(String(r.content||'')+' '+String(r.excerpt||''));if(/lorem ipsum|world’s best art museums|world's best art museums|Park Central Hotel|Singapore Cable Car/i.test(text+' '+r.title))return true;return r.type==='product'&&text.trim().length<80}
export function isPlaceholderText(s){return /^\s*Description Rate per day/i.test(plain(s||''))}

/* ---------- Next.js metadata ---------- */
export function buildMeta(data,{path,title,description:desc,image,type='website',noindex=false,published,modified}){
 const url=abs(data,path);const img=image?{url:abs(data,image.url||image),alt:image.alt||title}:{...DEFAULT_IMAGE,url:abs(data,DEFAULT_IMAGE.url)};
 const robots=noindex?{index:false,follow:true}:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}};
 return {title:{absolute:trimTitle(title)},description:clip(desc),alternates:{canonical:url},robots,openGraph:{type,siteName:BRAND,locale:'en_PK',url,title:trimTitle(title),description:clip(desc),images:[img],...(published?{publishedTime:iso(published)}:{}),...(modified?{modifiedTime:iso(modified)}:{})},twitter:{card:'summary_large_image',title:trimTitle(title),description:clip(desc),images:[img.url]}};
}
const iso=s=>{if(!s)return undefined;const v=String(s).replace(' ','T');return /[zZ]|[+-]\d\d:\d\d$/.test(v)?v:v+'+05:00'};

export function recordMeta(r,data){
 const l=legacy(r,data);const canon=canonicalPath(r,data);
 const noindex=r.protected||r.status!=='publish'||r.meta?._svseo_noindex==='1'||r.meta?._yoast_wpseo_meta_robots_noindex==='1'||String(r.meta?.rank_math_robots||'').includes('noindex')||isDemoOrThin(r); // template placeholder pages stay out of the index until real text is added
 const isHome=normalizePath(r.path)==='/';
 const title=isHome?'Shogran Valley: Hotels, Tours & Jeeps in Shogran, Kaghan':(l.title||autoTitle(r));
 let desc=isHome?'Book hotels, tour packages and 4×4 jeeps in Shogran, Siri Paye and the Kaghan Valley. Shogran sits at 7,749 ft, about 250 km (5–6 hours) from Islamabad.':(l.desc&&l.desc.length>=70&&!isPlaceholderText(l.desc)?l.desc:autoDesc(r,data));
 const img=imageFor(data,r);
 return buildMeta(data,{path:canon,title,description:desc,image:img?{url:img,alt:imageAlt(data,r)}:null,type:r.type==='post'?'article':'website',noindex,published:r.type==='post'?r.date:undefined,modified:r.type==='post'?r.modified:undefined});
}
/** Backwards-compatible helper used by the sitemap. */
export function seo(r,data){return recordMeta(r,data)}

export function destinationMeta(d,data){
 return buildMeta(data,{path:`/destination/${d.slug}/`,title:`${d.name}, Shogran: Guide, How to Reach & Best Time | ${BRAND}`,description:d.summary,image:d.img?{url:'/wp-content/themes/shogran-valley/assets/images/destinations/'+d.img,alt:d.name}:null});
}
export function listingMeta(path,data,{page=1,fallbackTitle,noindex=false}={}){
 const L=LISTINGS[path];const t=L?.title||`${plain(fallbackTitle)} | ${BRAND}`;const desc=L?.description||`${plain(fallbackTitle)}: Shogran and Kaghan Valley travel guides, hotels and tours from ${BRAND}.`;
 return buildMeta(data,{path:page>1?`${path}page/${page}/`:path,title:page>1?`${t.replace(/\s*\|.*$/,'')} – Page ${page} | ${BRAND}`:t,description:desc,noindex});
}

/* ---------- breadcrumbs (visible + schema) ---------- */
export function crumbsForRecord(r){const root=TYPE_ROOT[r.type];const c=[['Home','/']];if(root&&normalizePath(r.path)!==root[0])c.push([root[1],root[0]]);c.push([plain(r.title),r.path]);return c}

/* ---------- JSON-LD ---------- */
const place=n=>({'@type':'Place',name:n});
export function orgNode(data){const s=data.settings,tel=businessPhone(data);return {'@type':['TravelAgency','LocalBusiness'],'@id':ORG(data),name:BRAND,alternateName:BUSINESS.alternateName,slogan:BUSINESS.slogan,url:site(data)+'/',logo:{'@type':'ImageObject','@id':site(data)+'/#logo',url:abs(data,'/brand/shogran-valley-logo.png'),width:288,height:93,caption:BRAND},image:[abs(data,DEFAULT_IMAGE.url),abs(data,'/travel/shogran-hero-poster.jpg')],description:`${BRAND} is a local travel company in Shogran, Kaghan Valley, offering hotel bookings, tour packages and car and 4×4 jeep rental for Shogran, Siri Paye, Sharan Forest, Kaghan and Naran.`,telephone:tel,email:s.email,address:{'@type':'PostalAddress',streetAddress:BUSINESS.streetAddress,addressLocality:BUSINESS.locality,addressRegion:BUSINESS.region,addressCountry:BUSINESS.country},geo:{'@type':'GeoCoordinates',...BUSINESS.geo},hasMap:`https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],opens:'00:00',closes:'23:59'}],priceRange:BUSINESS.priceRange,currenciesAccepted:BUSINESS.currenciesAccepted,paymentAccepted:BUSINESS.paymentAccepted.join(', '),areaServed:BUSINESS.areaServed.map(place),knowsAbout:BUSINESS.knowsAbout,knowsLanguage:BUSINESS.languages,contactPoint:[{'@type':'ContactPoint',contactType:'customer service',telephone:tel,email:s.email,url:`https://wa.me/${s.whatsapp}`,availableLanguage:BUSINESS.languages,areaServed:'PK',hoursAvailable:{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],opens:'00:00',closes:'23:59'}}],...(BUSINESS.sameAs.length?{sameAs:BUSINESS.sameAs}:{})}}
function websiteNode(data){return {'@type':'WebSite','@id':site(data)+'/#website',url:site(data)+'/',name:BRAND,alternateName:BUSINESS.alternateName,description:'Hotels, tours, car rental and travel guides for Shogran and the Kaghan Valley, Pakistan.',publisher:{'@id':ORG(data)},inLanguage:LANG,potentialAction:{'@type':'SearchAction',target:{'@type':'EntryPoint',urlTemplate:site(data)+'/hotels/?q={search_term_string}'},'query-input':'required name=search_term_string'}}}
function breadcrumbNode(data,url,crumbs){return {'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:crumbs.map(([name,p],i)=>({'@type':'ListItem',position:i+1,name,item:abs(data,p)}))}}
export function faqNode(url,faqs){const f=(faqs||[]).filter(x=>x&&x.q&&x.a);return f.length?{'@type':'FAQPage','@id':url+'#faq',mainEntity:f.map(x=>({'@type':'Question',name:plain(x.q),acceptedAnswer:{'@type':'Answer',text:plain(x.a)}}))}:null}
const shogranPlace={'@type':'TouristDestination',name:'Shogran',description:SHOGRAN_SUMMARY,geo:{'@type':'GeoCoordinates',...BUSINESS.geo},containedInPlace:{'@type':'Place',name:'Kaghan Valley',containedInPlace:{'@type':'AdministrativeArea',name:'Khyber Pakhtunkhwa, Pakistan'}}};

/** Builds the complete @graph for a page. */
export function buildGraph(data,{path,title,description:desc,pageType='WebPage',crumbs,image,entities=[],faqs,published,modified,speakable=true}){
 const url=abs(data,path);const img=image?abs(data,image):abs(data,DEFAULT_IMAGE.url);
 const page={'@type':pageType,'@id':url+'#webpage',url,name:plain(title),description:clip(desc,300),isPartOf:{'@id':site(data)+'/#website'},inLanguage:LANG,primaryImageOfPage:{'@type':'ImageObject',url:img},...(crumbs&&crumbs.length>1?{breadcrumb:{'@id':url+'#breadcrumb'}}:{}),...(published?{datePublished:iso(published)}:{}),...(modified?{dateModified:iso(modified)}:{}),...(speakable?{speakable:{'@type':'SpeakableSpecification',cssSelector:['h1','.answer-box']}}:{}),...(entities[0]?{mainEntity:{'@id':entities[0]['@id']}}:{about:{'@id':ORG(data)}})};
 const graph=[orgNode(data),websiteNode(data),page,...(crumbs&&crumbs.length>1?[breadcrumbNode(data,url,crumbs)]:[]),...entities];
 const fq=faqNode(url,faqs);if(fq)graph.push(fq);
 return {'@context':'https://schema.org','@graph':graph};
}

/* ---------- entity nodes ---------- */
const imgs=(data,r)=>{const list=[imageFor(data,r),...String(field(r,'gallery_ids')||'').split(',').map(id=>data.media.find(m=>m.id===Number(id))?.path)].filter(Boolean);return [...new Set(list)].slice(0,6).map(p=>abs(data,p))};
const time24=s=>{const m=String(s||'').match(/(\d{1,2}):(\d{2})\s*([AP]M)?/i);if(!m)return undefined;let h=Number(m[1]);if(m[3]){const pm=m[3].toUpperCase()==='PM';if(pm&&h<12)h+=12;if(!pm&&h===12)h=0}return String(h).padStart(2,'0')+':'+m[2]+':00'};
const offer=(data,url,p,extra={})=>({'@type':'Offer',url,price:String(p),priceCurrency:'PKR',availability:'https://schema.org/InStock',seller:{'@id':ORG(data)},...extra});

export function recordEntities(r,data,url){
 const t=plain(r.title),d=clip(plain(description(r))||'',500),p=price(r),images=imgs(data,r);
 if(r.type==='sv_hotel'){const lat=Number(field(r,'lat')),lng=Number(field(r,'lng'));const rooms=json(field(r,'rooms_json'));const am=json(field(r,'amenities_json')).map(x=>typeof x==='string'?x.replace(/_/g,' '):x.name).filter(Boolean);
  return [{'@type':'Hotel','@id':url+'#hotel',name:t,url,description:d,image:images,address:{'@type':'PostalAddress',streetAddress:plain(field(r,'address'))||undefined,addressLocality:plain(field(r,'city'))||'Shogran',addressRegion:BUSINESS.region,addressCountry:'PK'},...(lat&&lng?{geo:{'@type':'GeoCoordinates',latitude:lat,longitude:lng}}:{}),...(field(r,'phone')?{telephone:phoneE164(field(r,'phone'))}:{}),...(Number(field(r,'stars'))?{starRating:{'@type':'Rating',ratingValue:Number(field(r,'stars'))}}:{}),...(p?{priceRange:`From PKR ${p.toLocaleString('en-PK')} per night`}:{}),...(time24(field(r,'checkin_time'))?{checkinTime:time24(field(r,'checkin_time'))}:{}),...(time24(field(r,'checkout_time'))?{checkoutTime:time24(field(r,'checkout_time'))}:{}),...(Number(field(r,'total_rooms'))?{numberOfRooms:Number(field(r,'total_rooms'))}:{}),amenityFeature:am.map(n=>({'@type':'LocationFeatureSpecification',name:n,value:true})),containedInPlace:{'@type':'Place',name:'Kaghan Valley'},makesOffer:rooms.filter(x=>Number(x.base_rate||x.price||x.rate)).map(x=>offer(data,url,Number(x.base_rate||x.price||x.rate),{name:plain(x.name),itemOffered:{'@type':'HotelRoom',name:plain(x.name),...(Number(x.capacity)?{occupancy:{'@type':'QuantitativeValue',maxValue:Number(x.capacity)}}:{})},priceSpecification:{'@type':'UnitPriceSpecification',price:Number(x.base_rate||x.price||x.rate),priceCurrency:'PKR',unitCode:'DAY',unitText:'per night'}}))}];}
 if(r.type==='sv_tour'){const it=json(field(r,'itinerary_json'));
  return [{'@type':['TouristTrip','Product'],'@id':url+'#trip',name:t,url,description:d,image:images,touristType:['Families','Couples','Groups','Nature lovers'],provider:{'@id':ORG(data)},brand:{'@type':'Brand',name:BRAND},...(it.length?{itinerary:{'@type':'ItemList',numberOfItems:it.length,itemListElement:it.map((day,i)=>({'@type':'ListItem',position:i+1,name:`Day ${i+1}: ${plain(day.title)}`,description:(day.steps||[]).map(plain).join('; ')}))}}:{}),...(p?{offers:offer(data,url,p,{priceSpecification:{'@type':'UnitPriceSpecification',price:p,priceCurrency:'PKR',referenceQuantity:{'@type':'QuantitativeValue',value:1,unitText:'person'}}})}:{})}];}
 if(r.type==='sv_vehicle'){const brand=t.split(' ')[0];const desc=isPlaceholderText(d)?`${t} available on rent with driver for Shogran, Kaghan and Naran.`:d;
  const off=p?{offers:offer(data,url,p,{businessFunction:'http://purl.org/goodrelations/v1#LeaseOut',priceSpecification:{'@type':'UnitPriceSpecification',price:p,priceCurrency:'PKR',unitCode:'DAY',unitText:'per day'}})}:{};
  // With photos: Product + Car (eligible for product snippets). Without photos: a car-rental Service (no image required).
  if(!images.length)return [{'@type':'Service','@id':url+'#vehicle',name:`${t} on rent`,url,description:desc,serviceType:'Car rental with driver',provider:{'@id':ORG(data)},areaServed:BUSINESS.areaServed.slice(0,8).map(place),...off}];
  return [{'@type':['Product','Car'],'@id':url+'#vehicle',name:t,url,description:desc,image:images,brand:{'@type':'Brand',name:brand},...(field(r,'model')?{vehicleModelDate:String(field(r,'model'))}:{}),...(Number(field(r,'capacity'))?{vehicleSeatingCapacity:Number(field(r,'capacity'))}:{}),...(field(r,'fuel')?{fuelType:plain(field(r,'fuel'))}:{}),...(field(r,'transmission')?{vehicleTransmission:plain(field(r,'transmission'))}:{}),...off}];}
 if(r.type==='post'){return [{'@type':'BlogPosting','@id':url+'#article',headline:clip(t,110),description:clip(leadText(description(r)),300),image:images.length?images:[abs(data,DEFAULT_IMAGE.url)],datePublished:iso(r.date),dateModified:iso(r.modified||r.date),author:{'@type':'Organization',name:`${BRAND} Travel Desk`,url:site(data)+'/about/'},publisher:{'@id':ORG(data)},mainEntityOfPage:{'@id':url+'#webpage'},inLanguage:LANG,about:shogranPlace,isPartOf:{'@type':'Blog','@id':site(data)+'/blog/#blog',name:'Shogran Travel Guides',url:site(data)+'/blog/'}}];}
 return [];
}
export function destinationEntity(d,data){const url=abs(data,`/destination/${d.slug}/`);return {'@type':d.type||'TouristAttraction','@id':url+'#place',name:d.name,description:d.summary,url,...(d.img?{image:abs(data,'/wp-content/themes/shogran-valley/assets/images/destinations/'+d.img)}:{}),...(d.geo?{geo:{'@type':'GeoCoordinates',...d.geo}}:{}),containedInPlace:{'@type':'Place',name:'Kaghan Valley',containedInPlace:{'@type':'AdministrativeArea',name:'Khyber Pakhtunkhwa, Pakistan'}},touristType:['Nature lovers','Families','Photographers','Trekkers']}}
export function homeEntities(data){const url=site(data)+'/';return [{...shogranPlace,'@id':url+'#shogran',url,image:abs(data,DEFAULT_IMAGE.url),includesAttraction:visibleDestinations.map(d=>({'@id':abs(data,`/destination/${d.slug}/`)+'#place','@type':'TouristAttraction',name:d.name,url:abs(data,`/destination/${d.slug}/`)}))}]}
export function itemListNode(data,path,items){const url=abs(data,path);return {'@type':'ItemList','@id':url+'#list',numberOfItems:items.length,itemListElement:items.slice(0,30).map((x,i)=>({'@type':'ListItem',position:i+1,url:abs(data,x.path),name:plain(x.title)}))}}

/** FAQs embedded in a record: tour faqs_json, SEO faq_json, and FAQPage JSON-LD that was pasted into post HTML. */
export function recordFaqs(r){
 const out=[];const add=list=>{for(const x of list||[]){const q=plain(x.q||x.question||x.name||''),a=plain(x.a||x.answer||x.acceptedAnswer?.text||'');if(q&&a&&!out.some(o=>o.q===q))out.push({q,a})}};
 add(json(field(r,'faqs_json')));add(json(r.meta?._svseo_faq_json));
 return out;
}
export function inlineFaqs(html){const out=[];for(const m of String(html||'').matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)){try{const o=JSON.parse(m[1]);const items=Array.isArray(o)?o:o['@graph']||[o];for(const i of items)if(i['@type']==='FAQPage')for(const q of i.mainEntity||[])out.push({q:q.name,a:q.acceptedAnswer?.text})}catch{}}return out.filter(x=>x.q&&x.a)}

export const jsonLd=obj=>JSON.stringify(obj).replace(/</g,'\\u003c');
export {HOME_FAQ,DESTINATIONS,destinationBySlug,visibleDestinations};
