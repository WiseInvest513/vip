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
  const illustration = render('![设备交付与调试](/images/articles/blackstone-ai-commissioning.webp "概念示意：从投入到回款。")');
  assert.ok(illustration.startsWith('<figure><img'));
  assert.ok(illustration.includes('<figcaption>概念示意：从投入到回款。</figcaption></figure>'));
  assert.ok(illustration.includes('width="1600" height="900"'));
  assert.ok(illustration.includes('loading="lazy" decoding="async"'));
  assert.ok(!illustration.includes('<p><figure>'));
  assert.ok(render('正文 ![图标](/icon.png) 继续。').startsWith('<p>正文'));
  for (const name of ['service', 'value-chain', 'cashflow', 'execution']) {
    const src = `/images/articles/nebius-ai-${name}.webp`;
    const caption = '概念示意，不是财务数据图。';
    const image = render(`![Nebius 研究插图](${src} "${caption}")`);
    assert.ok(image.startsWith('<figure><img'), `${name}: valid standalone figure`);
    assert.ok(image.includes('width="1600" height="900"'), `${name}: reserved image dimensions`);
    assert.ok(image.includes('loading="lazy" decoding="async"'), `${name}: deferred image loading`);
    assert.ok(image.includes(`<figcaption>${caption}</figcaption>`), `${name}: visible concept caption`);
    assert.ok(!image.includes('<p><figure>'), `${name}: figure is not nested in a paragraph`);
  }
  const articleSource = await readFile(new URL('../lib/articles/nebius-ai.ts', import.meta.url), 'utf8');
  const article = JSON.parse(articleSource.slice(articleSource.indexOf('{', articleSource.indexOf('export const')), articleSource.lastIndexOf('}') + 1));
  assert.ok(article.body.startsWith(article.preview), 'NBIS trial is an exact Markdown prefix');
  const prose = markdown => render(markdown).replace(/<figure>[\s\S]*?<\/figure>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, '');
  assert.ok(prose(article.preview).length / prose(article.body).length <= 0.30, 'NBIS visible trial prose stays at or below 30%');
  const fullArticle = render(article.body);
  const trialArticle = render(article.preview);
  assert.equal((fullArticle.match(/<figure>/g) ?? []).length, 4, 'NBIS full article renders all four concept illustrations');
  assert.equal((fullArticle.match(/<figcaption>/g) ?? []).length, 4, 'each NBIS illustration has a visible caption');
  assert.ok(trialArticle.includes('nebius-ai-service.webp'), 'NBIS trial includes its public service illustration');
  assert.ok(!trialArticle.includes('nebius-ai-value-chain.webp') && !trialArticle.includes('nebius-ai-cashflow.webp') && !trialArticle.includes('nebius-ai-execution.webp'), 'NBIS trial excludes references to the protected illustrations');
  assert.ok(!/<h[3-6]\b/.test(fullArticle), 'NBIS keeps one level of chapter headings');
  console.log('PASS Chinese bold, heading anchors, safe HTML/URLs, and lazy illustrations with valid captions');
} finally {
  await rm(outputUrl, { force: true });
}
