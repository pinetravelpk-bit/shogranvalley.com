import {readData} from '../../lib/store.mjs';import {publicRecords,imageFor,imageAlt,plain,normalizePath} from '../../lib/content.mjs';import {recordMeta,canonicalPath} from '../../lib/seo.mjs';import {DESTINATIONS} from '../../lib/knowledge.mjs';
export const dynamic='force-dynamic';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const day=s=>{const v=String(s||'').slice(0,10);return /^\d{4}-\d{2}-\d{2}$/.test(v)?v:''};
export function GET(){const d=readData(),site=d.settings.siteUrl;const all=publicRecords(d);const newest=all.map(r=>day(r.modified||r.date)).sort().pop();const map=new Map();
 const add=(path,lastmod,image,alt)=>{const k=normalizePath(path);if(!map.has(k))map.set(k,{path:k,lastmod,image,alt})};
 add('/',newest);['/hotels/','/tours/','/rent-a-car/','/blog/'].forEach(p=>add(p,newest));
 for(const x of DESTINATIONS)add(`/destination/${x.slug}/`,newest,x.img?'/wp-content/themes/shogran-valley/assets/images/destinations/'+x.img:'',x.name);
 for(const r of all){if(d.redirects.some(x=>normalizePath(x.source)===normalizePath(r.path)))continue;if(canonicalPath(r,d)!==r.path)continue;const m=recordMeta(r,d);if(!m.robots.index)continue;if(['/room-availability/','/create-invoice/'].includes(normalizePath(r.path)))continue;add(r.path,day(r.modified||r.date),imageFor(d,r),imageAlt(d,r))}
 const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'+[...map.values()].map(u=>`<url><loc>${esc(new URL(u.path,site).href)}</loc>${u.lastmod?`<lastmod>${u.lastmod}</lastmod>`:''}${u.image?`<image:image><image:loc>${esc(new URL(u.image,site).href)}</image:loc></image:image>`:''}</url>`).join('\n')+'\n</urlset>';
 return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}})}
