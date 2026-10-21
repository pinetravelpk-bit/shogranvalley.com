import {NextResponse} from 'next/server';
import crypto from 'node:crypto';
import {readData,rateLimit} from '../../../../lib/store.mjs';
import {ensureInvoice,invoiceTotals,invoiceKeyHash} from '../../../../lib/invoices.mjs';
import {renderInvoiceWithLogo,invoiceFilename} from '../../../../lib/invoice-pdf.mjs';
// Lets a guest open the invoice for their own enquiry, using the private key returned when they submitted it.
const fail=(error,status=400)=>NextResponse.json({error},{status,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
export async function GET(req){const u=new URL(req.url),ref=u.searchParams.get('ref')||'',key=u.searchParams.get('key')||'';const ip=(req.headers.get('x-forwarded-for')||'').split(',')[0].trim()||'local';if(!rateLimit('guest-invoice:'+ip,60,600000))return fail('Please try again shortly',429);if(!/^SV-[A-F0-9]{10}$/.test(ref)||!/^[a-f0-9]{48}$/.test(key))return fail('Invoice not found.',404);
 const data=readData(),booking=data.bookings.find(b=>b.fields?._ref===ref),stored=booking?.fields?._invoice_key;if(!stored||!crypto.timingSafeEqual(Buffer.from(stored,'hex'),Buffer.from(invoiceKeyHash(key),'hex')))return fail('Invoice not found.',404);
 const invoice=ensureInvoice(data,booking);
 if(u.searchParams.get('format')!=='pdf'){const {client,hotel,number,status,checkin,checkout,guests,items,taxPercent,advance}=invoice;return NextResponse.json({client,hotel,number,status,checkin,checkout,guests,items,taxPercent,advance,totals:invoiceTotals(invoice)},{headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex'}})}
 try{const pdf=await renderInvoiceWithLogo(data,invoice);return new Response(pdf,{headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${invoiceFilename(invoice)}"`,'Cache-Control':'private, no-store','X-Robots-Tag':'noindex'}})}catch(e){return fail(e.message)}}
