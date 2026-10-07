const {test} = require('node:test');
const assert = require('node:assert/strict');
const {sanitizeInternalCallbackUrl, normalizeMembershipTier, readWiseAuthSettings} = require('../.auth-test/wise-id.js');
const {verifyMembership} = require('../.auth-test/membership.js');
const {selectPrinciplesForViewer} = require('../.auth-test/principle-access.js');
test('redirects remain internal', () => {
 for (const url of ['https://evil.test','//evil.test','/\\evil.test','/\n/evil.test']) assert.equal(sanitizeInternalCallbackUrl(url), '/');
 assert.equal(sanitizeInternalCallbackUrl('/chat/research?from=login'), '/chat/research?from=login');
});
test('unknown memberships never grant VIP', () => {
 for(const tier of [null, undefined, 'ADMIN', 'vip', {}]) assert.equal(normalizeMembershipTier(tier), 'MEMBER');
 assert.equal(normalizeMembershipTier('VIP_PLUS'), 'VIP_PLUS');
});
test('missing client credentials disable sign-in', () => assert.equal(readWiseAuthSettings({}).configured, false));
const future = () => Math.floor(Date.now()/1000)+3600;
const response = (tier, sub='u1') => async (_, options) => {
 assert.equal(options.cache,'no-store');assert.equal(options.redirect,'error');
 return Response.json({sub, membership_tier:tier,name:'Test'});
};
test('membership downgrade is reflected immediately', async () => {
 assert.equal((await verifyMembership('token',future(),'u1','https://main.test',response('VIP'))).membershipTier,'VIP');
 assert.equal((await verifyMembership('token',future(),'u1','https://main.test',response('MEMBER'))).membershipTier,'MEMBER');
});
test('expired, wrong identity and unavailable provider fail closed', async () => {
 assert.equal(await verifyMembership('token',1,'u1','https://main.test',async()=>{throw Error('must not fetch')}),null);
 assert.equal(await verifyMembership('token',future(),'u1','https://main.test',response('VIP','other')),null);
 assert.equal(await verifyMembership('token',future(),'u1','https://main.test',async()=>{throw Error('offline')}),null);
 assert.equal(await verifyMembership('token',future(),'u1','https://main.test',async()=>new Response('',{status:401})),null);
});

const rules = Array.from({length:10},(_,i)=>({id:i+1,context:`private-context-${i+1}`}));
test('only verified VIP tiers can receive all principle fields', () => {
 for (const tier of [null,'MEMBER','ADMIN','vip','VIP_EXPIRED','']) {
  const selected=selectPrinciplesForViewer(rules,tier);
  assert.equal(selected.hasFullAccess,false);
  assert.equal(selected.total,10);
  assert.deepEqual(selected.visible,rules.slice(0,3));
  assert.equal(JSON.stringify(selected).includes('private-context-4'),false);
 }
 for(const tier of ['VIP','VIP_PLUS']) {
  const selected=selectPrinciplesForViewer(rules,tier);
  assert.equal(selected.hasFullAccess,true);
  assert.deepEqual(selected.visible,rules);
 }
 assert.equal(rules.length,10);
});
test('fresh membership downgrade and provider failure revoke full principle access',async()=>{
 for(const [request,count] of [[response('VIP'),10],[response('VIP_PLUS'),10],[response('MEMBER'),3],[response('ADMIN'),3],[response('VIP','other'),3],[async()=>new Response('',{status:503}),3]]) {
  const profile=await verifyMembership('token',future(),'u1','https://main.test',request);
  assert.equal(selectPrinciplesForViewer(rules,profile?.membershipTier??null).visible.length,count);
 }
 const expired=await verifyMembership('token',1,'u1','https://main.test',async()=>{throw Error('must not fetch')});
 assert.equal(selectPrinciplesForViewer(rules,expired?.membershipTier??null).visible.length,3);
});

const {FREE_DISCUSSION_SLUGS,canReadDiscussion}=require('../.auth-test/discussion-access.js');
test('exactly the original first three articles are public; unknown and new slugs stay locked',()=>{
 assert.deepEqual(FREE_DISCUSSION_SLUGS,['investment-principles','macro-observation','research-fewer-products']);
 for(const tier of [null,'MEMBER','ADMIN','vip']) {
  for(const slug of FREE_DISCUSSION_SLUGS)assert.equal(canReadDiscussion(slug,tier),true);
  for(const slug of ['earnings-quality','orders-and-execution','market-volatility','new-article','03','research-fewer-products?free=true'])assert.equal(canReadDiscussion(slug,tier),false);
 }
 for(const tier of ['VIP','VIP_PLUS'])assert.equal(canReadDiscussion('earnings-quality',tier),true);
});
test('fresh downgrade or unavailable membership removes article access',async()=>{
 for(const [request,allowed] of [[response('VIP'),true],[response('VIP_PLUS'),true],[response('MEMBER'),false],[response('VIP','other'),false],[async()=>new Response('',{status:503}),false]]){
  const user=await verifyMembership('token',future(),'u1','https://main.test',request);
  assert.equal(canReadDiscussion('earnings-quality',user?.membershipTier??null),allowed);
 }
});
