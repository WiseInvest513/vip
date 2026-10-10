import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import ts from 'typescript';

const sourceUrl = new URL('../components/articles/markdown.tsx', import.meta.url);
const outputUrl = new URL('../.auth-test/article-markdown.mjs', import.meta.url);
await mkdir(new URL('../.auth-test/', import.meta.url), { recursive: true });
const source = await readFile(sourceUrl, 'utf8');
await writeFile(outputUrl, ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText);
try {
  const { ArticleMarkdown, articleOutline } = await import(outputUrl.href);
  const render = body => renderToStaticMarkup(createElement(ArticleMarkdown, { body }));
  const body = '## 利率\n\n**一个基点等于0.01个百分点，25个基点就是0.25个百分点。**假设\n\n但**需要分开看。**不能混淆。';
  const html = render(body);
  assert.ok(html.includes('<strong>一个基点等于0.01个百分点，25个基点就是0.25个百分点。</strong>假设'));
  assert.ok(html.includes('但<strong>需要分开看。</strong>不能混淆。'));
  assert.ok(html.includes('id="section-1"'));
  assert.deepEqual(articleOutline(body), [{ id: 'section-1', title: '利率' }]);
  assert.ok(render('**公司盈利**已经上涨').includes('<strong>公司盈利</strong>已经上涨'));
  const literals = render('`**代码。**原样`\n\n```text\n**代码。**原样\n```\n\n\\*\\*原样。\\*\\*显示');
  assert.ok(!literals.includes('<strong>'));
  assert.ok(literals.includes('**代码。**原样'));
  assert.ok(literals.includes('**原样。**显示'));
  const unsafe = render('<script>alert(1)</script>\n\n[坏链接](javascript:alert%281%29)');
  assert.ok(!unsafe.includes('<script>'));
  assert.ok(!unsafe.includes('href="javascript:'));
  console.log('PASS Chinese bold rendering, unchanged heading anchors/code/escaped text, and safe HTML/URLs');
} finally {
  await rm(outputUrl, { force: true });
}
