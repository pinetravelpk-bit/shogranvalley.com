// Replaces long dashes (— and –, also as HTML entities) in site content with plain hyphens.
// Spaced dashes between words become " - "; range dashes like "5–6 hours" become "5-6 hours".
// Booking enquiries and invoices are left exactly as customers wrote them.
//   node scripts/remove-long-dashes.mjs --seed          updates data/seed.json
//   node scripts/remove-long-dashes.mjs --db [--dry]    updates $DATA_DIR/site.sqlite (live content)
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const EM = /[ \t ]*(?:—|&#8212;|&mdash;)[ \t ]*/g;
const EN_SPACED = /[ \t ]+(?:–|&#8211;|&ndash;)[ \t ]+/g;
const EN = /–|&#8211;|&ndash;/g;
export const undash = s => s.replace(EM, ' - ').replace(EN_SPACED, ' - ').replace(EN, '-');

const SKIP = new Set(['bookings', 'invoiceDrafts']);
function clean(value, stats) {
  if (typeof value === 'string') { const out = undash(value); if (out !== value) stats.changed++; return out; }
  if (Array.isArray(value)) return value.map(v => clean(v, stats));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, clean(v, stats)]));
  return value;
}
function cleanData(data) {
  const stats = {changed: 0};
  for (const key of Object.keys(data)) if (!SKIP.has(key)) data[key] = clean(data[key], stats);
  return stats.changed;
}

const args = import.meta.url === pathToFileURL(process.argv[1] || '').href ? process.argv.slice(2) : null;
if (!args) {
  // Imported as a module: only export undash().
} else if (args.includes('--seed')) {
  const file = path.resolve('data/seed.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const n = cleanData(data);
  fs.writeFileSync(file, JSON.stringify(data));
  console.log(`seed.json: ${n} text fields updated`);
} else if (args.includes('--db')) {
  const {DatabaseSync} = await import('node:sqlite');
  const db = new DatabaseSync(path.join(path.resolve(process.env.DATA_DIR || './runtime'), 'site.sqlite'));
  db.exec('BEGIN IMMEDIATE');
  try {
    const data = JSON.parse(db.prepare('SELECT value FROM state WHERE id=1').get().value);
    const n = cleanData(data);
    if (args.includes('--dry')) { db.exec('ROLLBACK'); console.log(`dry run: ${n} text fields would change`); }
    else { db.prepare('UPDATE state SET value=? WHERE id=1').run(JSON.stringify(data)); db.exec('COMMIT'); console.log(`database: ${n} text fields updated`); }
  } catch (e) { db.exec('ROLLBACK'); throw e; }
} else {
  console.log('Use --seed or --db [--dry]');
}
