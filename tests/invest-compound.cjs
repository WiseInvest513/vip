const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../lib/invest/compound.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context);
const { calculateCompound, normalizeCompoundInputs, compoundDefaults } = context.exports;
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.00001, `${actual} ≈ ${expected}`);

test('default case matches the month-end annuity formula and yearly records', () => {
  const result = calculateCompound(compoundDefaults);
  const rate = .08 / 12;
  near(result.balance, 10000 * (1 + rate) ** 120 + 1000 * ((1 + rate) ** 120 - 1) / rate);
  assert.equal(result.contributed, 130000);
  near(result.profit, result.balance - 130000);
  assert.equal(result.points.length, 11);
  assert.equal(result.points[0].year, 0);
  assert.equal(result.points[10].year, 10);
  assert.equal(result.points[10].balance, result.balance);
});

test('zero rate and zero contributions do not create returns', () => {
  const result = calculateCompound({ initial: 1000, monthly: 100, annualRate: 0, years: 2 });
  assert.equal(result.balance, 3400);
  assert.equal(result.profit, 0);
  const empty = calculateCompound({ initial: 0, monthly: 0, annualRate: 8, years: 10 });
  assert.equal(empty.balance, 0);
  assert.equal(empty.profit, 0);
});

test('deposits are credited at month end, not month beginning', () => {
  const result = calculateCompound({ initial: 0, monthly: 100, annualRate: 12, years: 1 });
  near(result.balance, 100 * ((1.01 ** 12 - 1) / .01));
  assert.ok(result.balance < 100 * ((1.01 ** 12 - 1) / .01) * 1.01);
});

test('negative annual assumptions can lose capital and remain finite', () => {
  const result = calculateCompound({ initial: 10000, monthly: 1000, annualRate: -20, years: 40 });
  assert.ok(result.profit < 0);
  assert.ok(result.balance > 0);
  assert.ok(Number.isFinite(result.balance));
  assert.ok(result.effectiveAnnualRate < 0);
});

test('finite inputs are bounded and duration is a whole year', () => {
  const bounded = normalizeCompoundInputs({ initial: -10, monthly: 99999999, annualRate: 100, years: 2.7 });
  assert.equal(bounded.initial, 0);
  assert.equal(bounded.monthly, 1000000);
  assert.equal(bounded.annualRate, 30);
  assert.equal(bounded.years, 3);
  const maximum = calculateCompound({ initial: 10000000, monthly: 1000000, annualRate: 30, years: 40 });
  assert.ok(Number.isFinite(maximum.balance));
  assert.equal(maximum.points.length, 41);
});

test('NaN, infinities, zero duration and negative durations cannot poison output', () => {
  const fallback = calculateCompound({ initial: NaN, monthly: Infinity, annualRate: -Infinity, years: NaN });
  assert.equal(fallback.inputs.initial, compoundDefaults.initial);
  assert.equal(fallback.inputs.monthly, compoundDefaults.monthly);
  assert.equal(fallback.inputs.annualRate, compoundDefaults.annualRate);
  assert.equal(fallback.inputs.years, compoundDefaults.years);
  assert.ok(Number.isFinite(fallback.balance));
  assert.equal(calculateCompound({ ...compoundDefaults, years: 0 }).inputs.years, 1);
  assert.equal(calculateCompound({ ...compoundDefaults, years: -10 }).inputs.years, 1);
});
