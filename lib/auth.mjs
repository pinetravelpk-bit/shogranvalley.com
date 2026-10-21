import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {dataDir,db} from './store.mjs';
export function configured(){return fs.existsSync(path.join(dataDir,'admin.json'))}
export function login(username,password){if(!configured()||typeof password!=='string'||password.length>300)return null;const c=JSON.parse(fs.readFileSync(path.join(dataDir,'admin.json'),'utf8'));const h=crypto.scryptSync(password,c.salt,64);if(username!==c.username||!crypto.timingSafeEqual(h,Buffer.from(c.hash,'hex')))return null;const token=crypto.randomBytes(32).toString('hex');db().prepare('INSERT INTO sessions VALUES(?,?)').run(digest(token),Date.now()+8*3600000);return token;}
function digest(t){return crypto.createHash('sha256').update(t).digest('hex')}
export function authorized(token){if(!token||!/^[a-f0-9]{64}$/.test(token))return false;const d=db();d.prepare('DELETE FROM sessions WHERE expires<?').run(Date.now());return Boolean(d.prepare('SELECT token FROM sessions WHERE token=?').get(digest(token)));}
export function logout(token){if(token)db().prepare('DELETE FROM sessions WHERE token=?').run(digest(token))}
export function cookieToken(req){return req.cookies.get('sv_session')?.value}
export function sameOrigin(req){const origin=req.headers.get('origin');return !!origin&&origin===new URL(process.env.APP_ORIGIN||req.url).origin}
