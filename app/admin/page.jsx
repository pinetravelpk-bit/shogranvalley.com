import '../admin.css';
import {cookies} from 'next/headers';import {authorized,configured} from '../../lib/auth.mjs';import Admin from '../../components/Admin';
export const dynamic='force-dynamic';export const metadata={title:'Administration | Shogran Valley',robots:{index:false,follow:false}};
export default async function AdminPage(){return <Admin signedIn={authorized((await cookies()).get('sv_session')?.value)} ready={configured()}/>}
