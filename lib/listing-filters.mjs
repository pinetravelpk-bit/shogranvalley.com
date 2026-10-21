export const normalized=v=>String(v||'').toLowerCase().trim();
export function filterListings(items,f={}){let rows=items.filter(r=>{
 if(f.q&&!normalized(r.title+' '+r.location+' '+r.summary).includes(normalized(f.q)))return false;
 if(f.location&&r.location!==f.location)return false;
 if(f.category&&r.category!==f.category)return false;
 if(f.min&&(!r.price||r.price<Number(f.min)))return false;
 if(f.max&&(!r.price||r.price>Number(f.max)))return false;
 if(f.guests&&r.capacity&&r.capacity<Number(f.guests))return false;
 if(f.stars&&r.stars!==Number(f.stars))return false;
 if(f.duration&&r.days!==Number(f.duration))return false;
 if(f.transmission&&r.transmission!==f.transmission)return false;
 if(f.fuel&&r.fuel!==f.fuel)return false;
 if(f.amenities?.length&&!f.amenities.every(a=>r.amenities.includes(a)))return false;
 return true;
 });
 if(f.sort==='price-up')rows.sort((a,b)=>(a.price||Infinity)-(b.price||Infinity));
 else if(f.sort==='price-down')rows.sort((a,b)=>(b.price||-Infinity)-(a.price||-Infinity));
 else if(f.sort==='name')rows.sort((a,b)=>a.title.localeCompare(b.title));
 return rows;
}
