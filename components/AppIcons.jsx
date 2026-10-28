// Line icons for the mobile app bar and menu drawer.
const paths={
 home:<><path d="M3 11 12 3l9 8"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/></>,
 hotel:<><path d="M3 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M15 9h4a2 2 0 0 1 2 2v10M3 21h18M7 7h1M11 7h1M7 11h1M11 11h1M7 15h1M11 15h1"/></>,
 tour:<><path d="m3 20 6-11 4 6 3-4 5 9z"/><circle cx="17" cy="5" r="2"/></>,
 car:<><path d="M5 17h14v-5l-2-5H7l-2 5z"/><path d="M3 12h18M7 17v2M17 17v2"/><circle cx="8" cy="14.5" r=".8"/><circle cx="16" cy="14.5" r=".8"/></>,
 book:<><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/></>,
 info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></>,
 blog:<><path d="M5 4h11l3 3v13H5z"/><path d="M9 9h6M9 13h6M9 17h4"/></>,
 phone:<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2"/>,
 download:<><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/></>,
 menu:<path d="M4 7h16M4 12h16M4 17h16"/>,
 close:<path d="M6 6l12 12M18 6 6 18"/>,
 arrow:<path d="M5 12h14M13 6l6 6-6 6"/>,
};
export function AppIcon({name,size=22,...props}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>}
export function WhatsAppIcon({size=22}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2m4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3"/></svg>}
export const MAIN_LINKS=[['/','Home','home'],['/hotels/','Hotels','hotel'],['/tours/','Tours','tour'],['/rent-a-car/','Rent a Car','car'],['/about/','About','info'],['/blog/','Blog','blog']];
