import {test} from 'node:test';
import assert from 'node:assert/strict';
import {quoteStay,validDate,nextDate} from '../lib/hotel-booking.mjs';
const room={base_rate:12000,weekend_rate:14000,peak_rate:16000,capacity:4};
const quote=(arrival,departure,rooms=1,guests=2)=>quoteStay(room,arrival,departure,rooms,guests,'2026-10-01');
test('Stay estimates cross month boundaries and multiply rooms once',()=>{assert.deepEqual(quote('2026-10-31','2026-11-02',2,8),{nights:2,rooms:2,guests:8,rate:12000,total:48000})});
test('Impossible dates, reversed stays, past dates and long stays are rejected',()=>{assert.equal(validDate('2026-02-29'),false);assert.equal(validDate('2028-02-29'),true);assert.equal(nextDate('2028-02-29'),'2028-03-01');for(const dates of [['2026-10-01','2026-10-01'],['2026-10-02','2026-10-01'],['2026-09-30','2026-10-02'],['2026-10-01','2026-11-02'],['2026-10-32','2026-11-02']])assert.throws(()=>quote(...dates))});
test('Capacity and room limits are enforced',()=>{for(const [rooms,guests] of [[1,5],[0,1],[11,1],[1.5,1],[1,0],[1,2.5]])assert.throws(()=>quote('2026-10-10','2026-10-12',rooms,guests));assert.equal(quote('2026-10-10','2026-10-12',2,8).total,48000)});
test('Unknown rates stay unquoted and seasonal rules are not invented',()=>{assert.equal(quoteStay({capacity:2},'2026-10-10','2026-10-12',1,2,'2026-10-01').total,null);assert.equal(quote('2026-10-10','2026-10-12').total,24000)});
