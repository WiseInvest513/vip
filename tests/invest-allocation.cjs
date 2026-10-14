const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateAllocation, allocationPresets } = require("../.auth-test/allocation.js");

test("illustrative allocations preserve all planned capital and never double count", () => {
  for (const preset of allocationPresets) {
    for (const amount of [1, 1000, 1234.57, 100000000]) {
      const result = calculateAllocation(amount, preset.dca, preset.margin);
      assert.equal(result.dca.percent + result.longTerm.percent + result.margin.percent, 100);
      assert.equal(Math.round((result.dca.amount + result.longTerm.amount + result.margin.amount) * 100), Math.round(amount * 100));
      assert.ok(result.longTerm.amount >= 0);
    }
  }
});

test("the 30/50/20 illustration separates margin from notional exposure", () => {
  const result = calculateAllocation(1000, 30, 20, 5);
  assert.equal(result.dca.amount, 300);
  assert.equal(result.longTerm.amount, 500);
  assert.equal(result.margin.amount, 200);
  assert.equal(result.exposure, 1000);
  assert.equal(calculateAllocation(1000, 30, 20, 2).margin.amount, result.margin.amount);
  assert.equal(calculateAllocation(1000, 50, 0, 5).exposure, 0);
});

test("range boundaries and invalid values cannot produce a negative remainder or NaN", () => {
  const capped = calculateAllocation(1000, 100, 80);
  assert.equal(capped.margin.percent, 30);
  assert.equal(capped.dca.percent, 70);
  assert.equal(capped.longTerm.amount, 0);
  const cents = calculateAllocation(1.05, 70, 30);
  assert.equal(cents.longTerm.amount, 0);
  assert.equal(Math.round((cents.dca.amount + cents.margin.amount) * 100), 105);
  for (const value of [NaN, Infinity, -50]) {
    const result = calculateAllocation(value, value, value, value);
    assert.equal(result.total, 0);
    assert.equal(result.margin.amount, 0);
    assert.equal(result.exposure, 0);
    assert.equal(result.leverage, 2);
  }
});
