// Shared enquiry-to-invoice mapping for the protected server and local demo.
const text=v=>String(v??'').replace(/<[^>]*>/g,'').replace(/&amp;/gi,'&').replace(/&#0?39;|&apos;/gi,"'").replace(/&quot;/gi,'"').trim();
const first=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='')??'';
const normalized=v=>text(v).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const parsed=v=>{try{return typeof v==='string'?JSON.parse(v):v}catch{return null}};
const field=(r,key)=>['_sv3_h_','_sh_','_svh_','_sv3_v_','_sv3_'].map(p=>r?.meta?.[p+key]).find(v=>v!==undefined&&v!=='');
export const PINE_TRAVEL_PHONE='03010873333';
export function selectedListing(data,b){const f=b.fields||{},records=(data.records||[]).filter(r=>['sv_hotel','sv_tour','sv_vehicle'].includes(r.type));const id=Number(first(f._listing_id,f._hotel_id));if(id)return records.find(r=>Number(r.id)===id)||null;const names=[f._listing,f._hotel_name,f._tour_name,f._vehicle_name].filter(Boolean).map(normalized);return records.find(r=>names.includes(normalized(r.title)))||null}
export function invoiceTotals(inv){const subtotal=Math.round(inv.items.reduce((n,i)=>n+Number(i.nights)*Number(i.quantity)*Number(i.rate),0)*100)/100;const tax=Math.round(subtotal*Number(inv.taxPercent))/100;return {subtotal,tax,total:Math.round((subtotal+tax)*100)/100,balance:Math.round((subtotal+tax-Number(inv.advance))*100)/100}}
export function invoiceFromEnquiry(data,b){
 const f=b.fields||{},r=selectedListing(data,b),checkin=text(first(f._checkin,f._date,f._svinv_checkin)),checkout=text(first(f._checkout,f._svinv_checkout));
 const roomName=text(first(f._room,f._room_type)),rooms=parsed(field(r,'rooms_json'))||[],room=Array.isArray(rooms)?rooms.find(x=>normalized(x.name)===normalized(roomName)):null;
 const nights=Math.max(1,Math.round((Date.parse(checkout)-Date.parse(checkin))/86400000)||Number(f._nights)||Number(f._days)||1);
 const hotel=r?text(r.title):text(first(f._listing,f._hotel_name,f._tour_name,f._vehicle_name,f._svinv_hotel_name));
 const details={client:text(first(f._name,f._svinv_client_name)),phone:text(first(f._phone,f._svinv_client_phone)),email:text(f._email),checkin,checkout,listingId:r?.id||null,hotel,website:r?text(r.meta?._invoice_website||(r.path?.includes('pine-park')?'pineparkshogran.com':'shogranvalley.com'+(r.path||''))):'',guests:Number(first(f._guests,f._persons))||0,city:text(f._city),requests:text(f._message),items:[{description:roomName||hotel||'Booking details to be confirmed',nights,quantity:Number(f._rooms)||1,rate:Number(first(f._base_rate,f._room_rate,room?.base_rate,0))||0}]};
 return {id:'INV-'+b.id,bookingId:b.id,number:text(f._ref)||String(b.id),status:'draft',created:new Date().toISOString(),bookingDate:String(b.date||f._created||new Date().toISOString()).slice(0,10),...details,agent:'',advance:0,taxPercent:10,sourceVersion:2,sourceFingerprint:JSON.stringify(details)};
}
export function ensureInvoice(data,b,{refresh=false}={}){data.invoiceDrafts??=[];const fresh=invoiceFromEnquiry(data,b);let inv=data.invoiceDrafts.find(i=>Number(i.bookingId)===Number(b.id));if(!inv){data.invoiceDrafts.unshift(fresh);return fresh}if(inv.status!=='issued'&&(refresh||inv.sourceVersion!==2||inv.sourceFingerprint!==fresh.sourceFingerprint)){const old={agent:inv.agent||'',taxPercent:inv.taxPercent??10,advance:inv.advance||0,created:inv.created};Object.assign(inv,fresh,old);if(inv.advance>invoiceTotals(inv).total)inv.advance=0;}return inv}
