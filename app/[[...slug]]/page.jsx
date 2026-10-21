import {notFound,redirect,permanentRedirect} from 'next/navigation';
import {readData} from '../../lib/store.mjs';
import {publicRecords,normalizePath,plain,imageFor,description} from '../../lib/content.mjs';
import {recordMeta,destinationMeta,listingMeta,buildMeta,buildGraph,recordEntities,recordFaqs,inlineFaqs,crumbsForRecord,canonicalPath,destinationBySlug,destinationEntity,homeEntities,itemListNode,jsonLd,HOME_FAQ,LISTINGS,abs,leadText} from '../../lib/seo.mjs';
import {Shell,Home,Listing,Detail,Destination,BookingPage} from '../../components/Site';
export const dynamic='force-dynamic';

const LISTING_TYPES={'hotels':'sv_hotel','tours':'sv_tour','rent-a-car':'sv_vehicle','blog':'post','shop':'product'};
const LISTING_TITLES={hotels:'Hotels in Shogran Valley',tours:'Tours in Shogran Valley','rent-a-car':'Rent a Car & 4×4 Jeeps for Shogran',blog:'Shogran Travel Guides',shop:'Travel Packages'};
function find(data,slug){const path=normalizePath('/'+(slug||[]).join('/'));return data.records.find(r=>normalizePath(r.path)===path)}

/* Works out what a URL is, once, for both metadata and rendering. */
function resolve(data,slug,q){
 const path=normalizePath('/'+slug.join('/'));const r=find(data,slug);const hasQuery=Object.keys(q||{}).length>0;
 if(!slug.length)return {kind:'home',path:'/',r};
 if(LISTING_TYPES[slug[0]]&&(slug.length===1||(slug.length===3&&slug[1]==='page'))){const pg=slug[1]==='page'?Number(slug[2]):1;const rows=publicRecords(data).filter(x=>x.type===LISTING_TYPES[slug[0]]).sort((a,b)=>b.date.localeCompare(a.date));return {kind:'listing',path,base:'/'+slug[0]+'/',pg,rows,title:LISTING_TITLES[slug[0]]||r?.title,hasQuery,r}}
 if(slug[0]==='book'&&slug.length===1)return {kind:'book',path:'/book/'};
 const tax=data.taxonomies.find(t=>normalizePath(t.path)===normalizePath('/'+slug.slice(0,2).join('/')));
 if(tax&&(slug.length===2||(slug.length===4&&slug[2]==='page'))){const pg=Number(slug[3]||1);return {kind:'taxonomy',path,tax,pg,rows:publicRecords(data).filter(x=>tax.postIds.includes(x.id)),hasQuery}}
 if(slug[0]==='destination'&&slug.length===2){const d=destinationBySlug(slug[1]);if(d)return {kind:'destination',path,d,alias:d.slug!==slug[1]}}
 if(r&&r.status==='publish'&&!r.protected)return {kind:'record',path:r.path,r};
 if(r?.protected)return {kind:'protected'};
 return {kind:'missing'};
}

export async function generateMetadata({params,searchParams}){
 const {slug=[]}=await params,q=await searchParams;const data=readData();const v=resolve(data,slug,q);
 let m;
 if(v.kind==='home')m=v.r?recordMeta(v.r,data):buildMeta(data,{path:'/',title:'Shogran Valley',description:data.settings.description});
 else if(v.kind==='listing')m=listingMeta(v.base,data,{page:v.pg,fallbackTitle:v.title});
 else if(v.kind==='book')m=listingMeta('/book/',data);
 else if(v.kind==='taxonomy')m=listingMeta(v.tax.path,data,{page:v.pg,fallbackTitle:v.tax.name,noindex:(v.rows.length<3)});
 else if(v.kind==='destination')m=destinationMeta(v.d,data);
 else if(v.kind==='record')m=recordMeta(v.r,data);
 else return {title:{absolute:'Page not found | Shogran Valley'},robots:{index:false,follow:true}};
 // Filtered/search URLs: keep crawlable but out of the index.
 if(v.hasQuery)m={...m,robots:{index:false,follow:true}};
 return m;
}

export default async function Page({params,searchParams}){
 const {slug=[]}=await params,q=await searchParams;const data=readData();const v=resolve(data,slug,q);
 let view,graph;
 switch(v.kind){
  case 'protected':redirect('/admin/');
  case 'missing':notFound();
  case 'home':{
   view=<Home data={data}/>;
   graph=buildGraph(data,{path:'/',title:'Shogran Valley: Hotels, Tours & Jeeps in Shogran, Kaghan',description:'Hotels, tour packages, car and 4×4 jeep rental and travel guides for Shogran, Siri Paye and the Kaghan Valley.',entities:homeEntities(data),faqs:HOME_FAQ});break}
  case 'listing':{
   if(!Number.isInteger(v.pg)||v.pg<1||v.pg>Math.max(1,Math.ceil(v.rows.length/12)))notFound();
   view=<Listing title={v.title} records={v.rows} data={data} query={String(q.q||'')} filters={q} page={v.pg} basePath={v.base}/>;
   const L=LISTINGS[v.base];graph=buildGraph(data,{path:v.path,title:L?.name||v.title,description:L?.description||v.title,pageType:'CollectionPage',crumbs:[['Home','/'],[L?.name||v.title,v.base]],entities:[itemListNode(data,v.path,v.rows.slice((v.pg-1)*12,v.pg*12+18))]});break}
  case 'book':{view=<BookingPage/>;graph=buildGraph(data,{path:'/book/',title:LISTINGS['/book/'].name,description:LISTINGS['/book/'].description,pageType:'ContactPage',crumbs:[['Home','/'],['Book','/book/']]});break}
  case 'taxonomy':{
   if(!Number.isInteger(v.pg)||v.pg<1||v.pg>Math.max(1,Math.ceil(v.rows.length/12)))notFound();
   view=<Listing title={v.tax.name} records={v.rows} data={data} page={v.pg} basePath={v.tax.path}/>;
   graph=buildGraph(data,{path:v.path,title:v.tax.name,description:v.tax.description||v.tax.name,pageType:'CollectionPage',crumbs:[['Home','/'],[plain(v.tax.name),v.tax.path]],entities:[itemListNode(data,v.path,v.rows.slice(0,30))]});break}
  case 'destination':{
   if(v.alias)permanentRedirect(`/destination/${v.d.slug}/`);
   view=<Destination d={v.d} data={data}/>;
   const crumbs=[['Home','/'],['Destinations','/#explore'],[v.d.name,`/destination/${v.d.slug}/`]];
   graph=buildGraph(data,{path:`/destination/${v.d.slug}/`,title:v.d.name,description:v.d.summary,crumbs:crumbs.filter(c=>c[1]!=='/#explore'),image:v.d.img?'/wp-content/themes/shogran-valley/assets/images/destinations/'+v.d.img:null,entities:[destinationEntity(v.d,data)],faqs:v.d.faqs});break}
  case 'record':{
   const r=v.r;const canon=canonicalPath(r,data);const url=abs(data,canon);
   view=<Detail r={r} data={data}/>;
   if(canon===r.path){const faqs=[...recordFaqs(r),...inlineFaqs(r.content)];const isAbout=normalizePath(r.path)==='/about/';
    graph=buildGraph(data,{path:r.path,title:plain(r.title),description:leadText(description(r)),pageType:isAbout?'AboutPage':'WebPage',crumbs:crumbsForRecord(r),image:imageFor(data,r),entities:recordEntities(r,data,url),faqs,published:r.date,modified:r.modified||r.date})}
   break}
 }
 return <Shell data={data}>{graph&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(graph)}}/>}{view}</Shell>;
}
