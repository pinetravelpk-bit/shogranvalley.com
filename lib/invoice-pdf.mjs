import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {renderInvoiceDocument} from './invoice-document.mjs';
import {bundledMediaDir,dataDir} from './store.mjs';
export async function renderInvoice(inv,logoBytes=null){const root=path.resolve('assets/invoice');const names={regular:'regular.ttf',bold:'bold.ttf',template:'template.jpg',pinePark:'pine-park.png'};const assets=Object.fromEntries(await Promise.all(Object.entries(names).map(async([k,f])=>[k,await fs.readFile(path.join(root,f))])));return Buffer.from(await renderInvoiceDocument(inv,assets,logoBytes));}
// Renders the invoice with the selected hotel's own logo, as used by both the admin and guest downloads.
export async function renderInvoiceWithLogo(data,invoice){let logo=null;const r=data.records.find(r=>r.id===invoice.listingId),m=data.media.find(m=>m.id===Number(r?.meta?._invoice_logo_id));if(m){for(const root of [path.join(dataDir,'uploads'),bundledMediaDir])try{logo=await fs.readFile(path.join(root,m.path.replace('/wp-content/uploads/','')));break}catch{}}if(logo)logo=await sharp(logo).resize(400,400,{fit:'inside'}).png().toBuffer();return renderInvoice(invoice,logo)}
export const invoiceFilename=invoice=>`Pine-Travel-${invoice.number.replace(/[^a-z0-9-]/gi,'_')}.pdf`;
