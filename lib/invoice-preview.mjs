export async function previewInvoicePDF(invoice){
 const {renderInvoiceDocument}=await import('./invoice-document.mjs');
 const names={regular:'regular.ttf',bold:'bold.ttf',template:'template.jpg',pinePark:'pine-park.png'};
 const assets=Object.fromEntries(await Promise.all(Object.entries(names).map(async([k,file])=>{const response=await fetch('/invoice-assets/'+file);if(!response.ok)throw Error('Unable to load invoice assets. Please reload.');return [k,new Uint8Array(await response.arrayBuffer())]})));
 return new Blob([await renderInvoiceDocument(invoice,assets)],{type:'application/pdf'});
}
export const PREVIEW_BOOKINGS_KEY='sv-preview-enquiries-v2';
export function readPreviewBookings(){try{const rows=JSON.parse(sessionStorage.getItem(PREVIEW_BOOKINGS_KEY)||'[]');return Array.isArray(rows)?rows:[]}catch{return []}}
export function savePreviewEnquiry(hotel,room,contact,stay,estimate){const id=Date.now(),reference='DEMO-'+id;const booking={id,type:'shogran_booking',title:reference,date:new Date().toISOString(),fields:{_ref:reference,_status:'pending',_listing_id:hotel.id,_listing:hotel.title,_name:contact.name.trim(),_phone:contact.phone,_email:contact.email||'',_message:contact.message||'',_room:room.name,_checkin:stay.checkin,_checkout:stay.checkout,_guests:Number(stay.guests),_rooms:estimate.rooms,_nights:estimate.nights,_base_rate:estimate.rate}};sessionStorage.setItem(PREVIEW_BOOKINGS_KEY,JSON.stringify([booking,...readPreviewBookings()].slice(0,30)));return reference}
