export const formatMoney=value=>'PKR '+Number(value||0).toLocaleString('en-PK');
export function todayISO(){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`}
export function validDate(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===value}
export function nextDate(value){if(!validDate(value))return '';return new Date(new Date(value+'T00:00:00Z').getTime()+86400000).toISOString().slice(0,10)}
export function quoteStay(room,arrival,departure,count=1,guests=1,today=todayISO()){
 if(!room)throw Error('Choose a room first.');
 if(!validDate(arrival)||!validDate(departure))throw Error('Choose both check-in and check-out dates.');
 if(arrival<today)throw Error('Check-in cannot be in the past.');
 const nights=(Date.parse(departure+'T00:00:00Z')-Date.parse(arrival+'T00:00:00Z'))/86400000;
 if(nights<1)throw Error('Check-out must be after check-in.');if(nights>30)throw Error('For stays over 30 nights, please contact us on WhatsApp.');
 const rooms=Number(count),people=Number(guests);if(!Number.isInteger(rooms)||rooms<1||rooms>10)throw Error('Choose between 1 and 10 rooms.');
 if(!Number.isInteger(people)||people<1||people>500)throw Error('Enter a valid number of guests.');
 const capacity=Number(room.capacity)||0;if(capacity&&people>capacity*rooms)throw Error(`This room sleeps up to ${capacity} guests. Add rooms or choose another room type.`);
 const rate=Number(room.base_rate)||0;return {nights,rooms,guests:people,rate,total:rate>0?rate*nights*rooms:null};
}
