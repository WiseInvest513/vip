import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const temp = mkdtempSync(join(tmpdir(), 'wise-historical-returns-'));
execFileSync('./node_modules/.bin/tsc', ['lib/invest/historical-returns.ts', '--outDir', temp, '--module', 'commonjs', '--target', 'ES2022', '--skipLibCheck']);
const require = createRequire(import.meta.url);
const { historicalCompanies, companyReturn, annualReturns } = require(join(temp, 'historical-returns.js'));
process.on('exit', () => rmSync(temp, { recursive: true, force: true }));
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.000001, `${actual} != ${expected}`);

test('snapshots preserve distinct report endpoints and verifiable issuer sources', () => {
  assert.equal(historicalCompanies.length, 9);
  assert.equal(new Set(historicalCompanies.map(company => company.ticker)).size, 9);
  for (const company of historicalCompanies) {
    assert.equal(company.points.length, 6);
    assert.equal(company.points[0].value, 100);
    assert.ok(company.points.every(point => Number.isFinite(point.value) && point.value > 0));
    assert.ok(company.source.href.startsWith('https://'));
    assert.ok(company.endDate <= '2026-10-14');
    assert.ok(company.source.location.length > 0);
  }
  assert.equal(historicalCompanies.find(company => company.ticker === 'NVDA').endDate, '2026-01-25');
  assert.equal(historicalCompanies.find(company => company.ticker === 'MSFT').endDate, '2025-06-30');
});

test('three and four years use the correct rebased starting node, not five-year return divided by time', () => {
  const msft = historicalCompanies.find(company => company.ticker === 'MSFT');
  close(companyReturn(msft, 3).cumulative, (255.13 / 128.48 - 1) * 100);
  close(companyReturn(msft, 4).cumulative, (255.13 / 134.41 - 1) * 100);
  close(companyReturn(msft, 5).cumulative, 155.13);
  assert.equal(companyReturn(msft, 3).start, '2022-06-30');
  close(companyReturn(msft, 5).valueOfTenThousand, 25513);
});

test('annualization compounds back to cumulative return and dollar example', () => {
  for (const company of historicalCompanies) for (const period of [3, 4, 5]) {
    const result = companyReturn(company, period);
    close(Math.pow(1 + result.annualized / 100, period), 1 + result.cumulative / 100);
    close(result.valueOfTenThousand, 10000 * (1 + result.cumulative / 100));
  }
});

test('annual nodes preserve losses instead of presenting a smooth rise', () => {
  const meta = historicalCompanies.find(company => company.ticker === 'META');
  const years = annualReturns(meta);
  assert.equal(years.length, 5);
  assert.equal(years[1].end, '2022-12-31');
  close(years[1].value, (44.05 / 123.13 - 1) * 100);
  assert.ok(years[1].value < -60);
  const jnj = historicalCompanies.find(company => company.ticker === 'JNJ');
  assert.ok(annualReturns(jnj)[2].value < 0);
  assert.ok(annualReturns(jnj)[3].value < 0);
});
