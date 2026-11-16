import fs from 'node:fs';
import path from 'node:path';

/*
 Long-form page guides live in content/guides/<key>.html, one file per URL:
   /                         -> home.html
   /hotels/                  -> hotels.html
   /rent-a-car/toyota-prado/ -> rent-a-car__toyota-prado.html
 A guide is plain HTML. An optional <section class="guide-faq"> holds FAQ pairs as
 <h3>question</h3><p>answer</p>; they are shown with the FAQ component and added to
 the page's FAQPage schema. Guides are versioned in git, so admin edits to page
 content in the database are never overwritten.
*/
const dir = path.resolve('content/guides');
const cache = new Map();

export const guideKey = p => {
  const clean = String(p || '/').split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
  return clean ? clean.split('/').join('__') : 'home';
};

const text = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#039;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

export function loadGuide(pagePath) {
  const key = guideKey(pagePath);
  if (!/^[a-z0-9_-]+$/.test(key)) return null;
  const file = path.join(dir, key + '.html');
  let stat;
  try { stat = fs.statSync(file); } catch { return null; }
  const hit = cache.get(key);
  if (hit && hit.mtime === stat.mtimeMs) return hit.guide;
  const raw = fs.readFileSync(file, 'utf8');
  const faqs = [];
  const html = raw.replace(/<section class="guide-faq"[^>]*>([\s\S]*?)<\/section>/i, (_, inner) => {
    for (const m of inner.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*([\s\S]*?)(?=<h3|$)/gi)) {
      const q = text(m[1]), a = text(m[2]);
      if (q && a) faqs.push({q, a});
    }
    return '';
  }).trim();
  const guide = {key, html, faqs, words: text(raw).split(' ').filter(Boolean).length};
  cache.set(key, {mtime: stat.mtimeMs, guide});
  return guide;
}
