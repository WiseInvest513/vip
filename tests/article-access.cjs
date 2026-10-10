const { test } = require('node:test');
const assert = require('node:assert/strict');
const { canReadArticle } = require('../.auth-test/article-access.js');
const { verifyMembership } = require('../.auth-test/membership.js');

test('public articles remain readable to every viewer', () => {
  for (const tier of [null, 'MEMBER', 'VIP', 'VIP_PLUS', 'ADMIN', 'vip', 'VIP_EXPIRED', '']) {
    assert.equal(canReadArticle('public', tier), true);
  }
});

test('VIP articles require an exact verified VIP membership tier', () => {
  for (const tier of [null, undefined, 'MEMBER', 'ADMIN', 'vip', 'VIP_EXPIRED', '', {}]) {
    assert.equal(canReadArticle('vip', tier), false);
  }
  for (const tier of ['VIP', 'VIP_PLUS']) {
    assert.equal(canReadArticle('vip', tier), true);
  }
});

test('unknown access labels fail closed even for VIP members', () => {
  for (const access of [null, undefined, '', 'VIP', 'PUBLIC', 'public ', 'member', 'subscription', {}]) {
    for (const tier of [null, 'MEMBER', 'VIP', 'VIP_PLUS']) {
      assert.equal(canReadArticle(access, tier), false);
    }
  }
});

test('membership downgrades, expiry and provider failures revoke full article access', async () => {
  const future = Math.floor(Date.now() / 1000) + 3600;
  const profile = (tier, sub = 'viewer-1') => async (_, options) => {
    assert.equal(options.cache, 'no-store');
    assert.equal(options.redirect, 'error');
    return Response.json({ sub, membership_tier: tier, name: 'Test viewer' });
  };
  const scenarios = [
    [profile('VIP'), true],
    [profile('VIP_PLUS'), true],
    [profile('MEMBER'), false],
    [profile('ADMIN'), false],
    [profile('VIP', 'other-viewer'), false],
    [async () => new Response('', { status: 401 }), false],
    [async () => new Response('', { status: 503 }), false],
    [async () => { throw new Error('offline'); }, false],
  ];
  for (const [request, allowed] of scenarios) {
    const user = await verifyMembership('token', future, 'viewer-1', 'https://main.test/userinfo', request);
    assert.equal(canReadArticle('vip', user?.membershipTier ?? null), allowed);
  }
  const expired = await verifyMembership('token', 1, 'viewer-1', 'https://main.test/userinfo', async () => {
    throw new Error('Expired sessions must not reach the provider');
  });
  assert.equal(canReadArticle('vip', expired?.membershipTier ?? null), false);
});
