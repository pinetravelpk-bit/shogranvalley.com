// Checks every content/guides/*.html against a running site:
// words in <main>, long dashes, FAQ schema count and broken internal links.
// Usage: node validate-guides.mjs [baseUrl] [guidesDir]
import fs from 'node:fs';
import path from 'node:path';
const base = process.argv[2] || 'http://localhost:3000';
const dir = process.argv[3] || path.resolve('content/guides');
const toPath = k => k === 'home' ? '/' : '/' + k.split('__').join('/') + '/';
const words = h => {
  const main = (h.match(/<main[\s\S]*?<\/main>/) || [''])[0].replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<nav[\s\S]*?<\/nav>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
  return (main.match(/[A-Za-z0-9][A-Za-z0-9'’.,-]*/g) || []).length;
};
const linkCache = new Map();
async function linkOk(href) {
  if (!linkCache.has(href)) linkCache.set(href, fetch(base + href, {redirect: 'manual'}).then(r => r.status).catch(() => 0));
  return linkCache.get(href);
}
const rows = [];
for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort()) {
  const key = file.slice(0, -5), p = toPath(key), src = fs.readFileSync(path.join(dir, file), 'utf8');
  const res = await fetch(base + p);
  const html = await res.text();
  const issues = [];
  if (res.status !== 200) issues.push('HTTP ' + res.status);
  if (!/class="page-guide/.test(html)) issues.push('guide not rendered');
  const dashes = (src.match(/[–—]|&#821[12];|&[mn]dash;/g) || []).length;
  if (dashes) issues.push(dashes + ' long dashes in guide');
  const faqSrc = ((src.match(/<section class="guide-faq"[\s\S]*?<\/section>/) || [''])[0].match(/<h3/g) || []).length;
  const w = words(html);
  if (w < 1000) issues.push('only ' + w + ' words');
  for (const m of src.matchAll(/href="(\/[^"#?]*)"/g)) {
    const s = await linkOk(m[1]);
    if (s !== 200) issues.push('link ' + m[1] + ' -> ' + s);
  }
  rows.push({p, w, faqSrc, issues});
}
for (const r of rows) console.log(String(r.w).padStart(5), (r.issues.length ? 'FIX ' : 'ok  '), r.p, 'faq:' + r.faqSrc, r.issues.join('; '));
console.log(`\n${rows.length} guides, ${rows.filter(r => !r.issues.length).length} ok, ${rows.filter(r => r.issues.length).length} need fixes`);
