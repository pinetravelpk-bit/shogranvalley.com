'use client';
import {useEffect,useState} from 'react';
import {todayISO,nextDate} from '../lib/hotel-booking.mjs';
const modes={
 hotels:{tab:'🏨 Hotels',button:'Search hotels',destination:'Destination or hotel',placeholder:'Shogran, Pine Park, Malakandi…',start:'Check-in',end:'Check-out',people:'Guests per room'},
 tours:{tab:'🧭 Tours',button:'Find tours',destination:'Tour destination',placeholder:'Shogran, Sharan, Naran…',start:'Departure date',people:'Travellers'},
 'rent-a-car':{tab:'🚙 Rent a Car',button:'Find vehicles',destination:'Pickup city or vehicle',placeholder:'Islamabad, Toyota, jeep…',start:'Pickup date',end:'Return date',people:'Passengers'}
};
export default function TravelSearch(){
 const[type,setType]=useState('hotels'),[today,setToday]=useState(''),[values,setValues]=useState({hotels:{},tours:{},'rent-a-car':{}});const mode=modes[type],v=values[type];
 useEffect(()=>setToday(todayISO()),[]);
 function change(name,value){setValues(all=>{const next={...all[type],[name]:value};if(name==='checkin'&&next.checkout&&next.checkout<=value)next.checkout=nextDate(value);return {...all,[type]:next}})}
 const date=(name,label)=><label>{label}<input type="date" name={name} value={v[name]||''} min={name==='checkout'&&v.checkin?nextDate(v.checkin):today||undefined} onChange={e=>change(name,e.target.value)}/></label>;
 return <form className={'search-box search-mode-'+type} action={'/'+type+'/'} method="get" aria-label={mode.button}>
 <div className="search-tabs" aria-label="Choose search category">{Object.entries(modes).map(([key,m])=><button key={key} type="button" className={'search-tab '+(type===key?'active':'')} aria-pressed={type===key} aria-controls="travel-search-fields" onClick={()=>setType(key)}>{m.tab}</button>)}</div>
 <div className="search-fields" id="travel-search-fields" key={type}>
 <label>{mode.destination}<input name="q" value={v.q||''} placeholder={mode.placeholder} onChange={e=>change('q',e.target.value)}/></label>
 {date('checkin',mode.start)}
 {mode.end?date('checkout',mode.end):<label>Tour duration<select name="duration" value={v.duration||''} onChange={e=>change('duration',e.target.value)}><option value="">Any duration</option>{[1,2,3,4,5,6,7].map(n=><option key={n} value={n}>{n} {n===1?'day':'days'}</option>)}</select></label>}
 <label>{mode.people}<input name="guests" type="number" min="1" max={type==='hotels'?30:500} value={v.guests||''} placeholder="Any" onChange={e=>change('guests',e.target.value)}/></label>
 {type==='rent-a-car'&&<label>Transmission<select name="transmission" value={v.transmission||''} onChange={e=>change('transmission',e.target.value)}><option value="">Any transmission</option><option>Automatic</option><option>Manual</option></select></label>}
 <button type="submit" className="button">{mode.button} →</button>
 </div></form>
}
