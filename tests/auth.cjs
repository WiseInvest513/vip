const {test} = require('node:test');
const assert = require('node:assert/strict');
const {sanitizeInternalCallbackUrl, normalizeMembershipTier, readWiseAuthSettings} = require('../.auth-test/wise-id.js');
const {verifyMembership} = require('../.auth-test/membership.js');
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
