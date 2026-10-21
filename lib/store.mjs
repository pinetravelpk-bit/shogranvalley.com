import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
export const dataDir = path.resolve(process.env.DATA_DIR || './runtime');
export function db() {
 if (!globalThis.__svdb) {
  fs.mkdirSync(dataDir,{recursive:true});
  const d=new DatabaseSync(path.join(dataDir,'site.sqlite')); d.exec('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY, value TEXT NOT NULL); CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, expires INTEGER); CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER, until INTEGER)');
  if (!d.prepare('SELECT id FROM state WHERE id=1').get()) d.prepare('INSERT INTO state VALUES(1,?)').run(fs.readFileSync(path.resolve('data/seed.json'),'utf8'));
  globalThis.__svdb=d;
 } return globalThis.__svdb;
}
export function readData(){return JSON.parse(db().prepare('SELECT value FROM state WHERE id=1').get().value)}
export function updateData(fn){const d=db();d.exec('BEGIN IMMEDIATE');try{const data=readData();const result=fn(data);d.prepare('UPDATE state SET value=? WHERE id=1').run(JSON.stringify(data));d.exec('COMMIT');return result;}catch(e){d.exec('ROLLBACK');throw e;}}
export function rateLimit(key,max=10,windowMs=900000){const d=db();const now=Date.now();d.prepare('DELETE FROM limits WHERE until<?').run(now);const row=d.prepare('SELECT * FROM limits WHERE key=?').get(key);if(row&&row.count>=max)return false;d.prepare('INSERT INTO limits VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1').run(key,now+windowMs);return true;}

export const bundledMediaDir = path.resolve("media/uploads");
