import {readData} from '../../lib/store.mjs';
export const dynamic='force-dynamic';
// Search engines and AI answer engines are explicitly welcome (SEO + GEO/AEO). Private areas stay blocked.
const AI_BOTS=['Googlebot','Bingbot','Applebot','DuckDuckBot','YandexBot','GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','Claude-User','PerplexityBot','Perplexity-User','Google-Extended','Applebot-Extended','Amazonbot','Meta-ExternalAgent','CCBot','cohere-ai','MistralAI-User','DuckAssistBot'];
const PRIVATE=['/admin/','/api/','/room-availability/','/create-invoice/'];
export function GET(){const site=readData().settings.siteUrl.replace(/\/$/,'');const block=ua=>`User-agent: ${ua}\nAllow: /\n${PRIVATE.map(p=>'Disallow: '+p).join('\n')}\n`;
 const body=['# Shogran Valley: hotels, tours and jeeps in Shogran, Kaghan Valley, Pakistan','# AI summary for language models: '+site+'/llms.txt','',block('*'),...AI_BOTS.map(block),'Sitemap: '+site+'/sitemap.xml',''].join('\n');
 return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}})}
