import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {publicRecords} from '../lib/content.mjs';
import {recordMeta,canonicalPath,buildGraph,recordEntities,recordFaqs,abs} from '../lib/seo.mjs';
import {HOME_FAQ,DESTINATIONS,destinationBySlug} from '../lib/knowledge.mjs';

const data=JSON.parse(fs.readFileSync(new URL('../data/seed.json',import.meta.url),'utf8'));
const pub=publicRecords(data);
const byPath=p=>pub.find(r=>r.path===p);

test('hotel, tour and vehicle pages are self-canonical (not the listing page)',()=>{
 for(const r of pub.filter(r=>['sv_hotel','sv_tour','sv_vehicle'].includes(r.type))){
  assert.equal(recordMeta(r,data).alternates.canonical,abs(data,r.path),r.path);
 }
});

test('legacy duplicates point to the main hotel page',()=>{
 const legacy=byPath('/fairyland-hotel-restaurant-malakandi-kaghan/');
 assert.equal(canonicalPath(legacy,data),'/hotels/fairyland-hotel-restaurant-malakandi-kaghan/');
});

test('no two indexable pages share a title',()=>{
 const seen=new Map();
 for(const r of pub){if(canonicalPath(r,data)!==r.path)continue;const m=recordMeta(r,data);if(!m.robots.index)continue;const t=m.title.absolute;assert.ok(!seen.has(t),`duplicate title "${t}" on ${r.path} and ${seen.get(t)}`);seen.set(t,r.path)}
});

test('theme demo and lorem-ipsum pages are noindex',()=>{
 assert.equal(recordMeta(byPath('/terms-and-condition/'),data).robots.index,false);
 assert.equal(recordMeta(byPath('/product/apartment-in-wellington-3/'),data).robots.index,false);
});

test('titles and descriptions stay within search snippet limits',()=>{
 for(const r of pub){const m=recordMeta(r,data);assert.ok(m.title.absolute.length<=70,r.path+' title');assert.ok(m.description.length<=170,r.path+' description')}
});

test('tour pages publish TouristTrip offers and visible FAQs',()=>{
 const tour=pub.find(r=>r.type==='sv_tour');const url=abs(data,tour.path);
 const g=buildGraph(data,{path:tour.path,title:tour.title,description:'x',entities:recordEntities(tour,data,url),faqs:recordFaqs(tour)})['@graph'];
 const trip=g.find(n=>Array.isArray(n['@type'])&&n['@type'].includes('TouristTrip'));
 assert.ok(trip.offers.price);assert.equal(trip.offers.priceCurrency,'PKR');
 assert.ok(g.find(n=>n['@type']==='FAQPage').mainEntity.length>0);
 assert.ok(g.find(n=>Array.isArray(n['@type'])&&n['@type'].includes('LocalBusiness')).geo.latitude);
});

test('knowledge base is complete',()=>{
 assert.ok(HOME_FAQ.length>=6);
 for(const d of DESTINATIONS){assert.ok(d.summary.length>80,d.slug);assert.ok(d.facts.length>=3,d.slug)}
 assert.equal(destinationBySlug('malakandi').slug,'malkandi');
 for(const f of HOME_FAQ)assert.ok(f.href==='/book/'||byPath(f.href),'FAQ link exists: '+f.href);
});
