import '@fontsource/fraunces/latin-600.css';
import '@fontsource/fraunces/latin-700.css';
import '@fontsource/fraunces/latin-800.css';
import '@fontsource/fraunces/latin-600-italic.css';
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-500.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import '@fontsource/plus-jakarta-sans/latin-800.css';
import './globals.css';
import './hotel.css';
import './travel.css';
import './catalog.css';
import './theme.css';
import './vivid.css';
import './mobile-app.css';
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#0e2e1d'};
export const metadata={metadataBase:new URL('https://shogranvalley.com'),applicationName:'Shogran Valley',title:{default:'Shogran Valley: Hotels, Tours & Jeeps in Shogran, Kaghan',template:'%s'},description:'Hotels, tour packages, car and 4×4 jeep rental and travel guides for Shogran, Siri Paye and the Kaghan Valley, Pakistan.',manifest:'/manifest.webmanifest',appleWebApp:{capable:true,statusBarStyle:'default',title:'Shogran Valley'},icons:{icon:'/travel/icon-192.png',apple:'/travel/icon-192.png'},authors:[{name:'Shogran Valley',url:'https://shogranvalley.com/about/'}],creator:'Shogran Valley',publisher:'Shogran Valley',category:'travel',formatDetection:{telephone:true,email:true,address:true},verification:{google:'6GguWXyI8NTKNGQq9cY6aw3nzgq2ecCJlXeibt-v-Dw'},alternates:{types:{'text/markdown':'/llms.txt'}},other:{'geo.region':'PK-KP','geo.placename':'Shogran, Kaghan Valley, Mansehra, Khyber Pakhtunkhwa','geo.position':'34.633;73.467','ICBM':'34.633, 73.467'}};
export default function Layout({children}){return <html lang="en-PK"><body>{children}</body></html>}
