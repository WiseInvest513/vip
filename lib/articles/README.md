# Wise VIP 研究文章

入口 `/article`，分类 `/article/category/{us-markets|earnings|companies|crypto}`，正文 `/article/{slug}`。

本次仅迁入 MyBlog/content/articles/VIP 的 001.md、002.md；主站原文件未移动、删除或发布重定向。VIP 站内旧 `/articles/VIP/WGa8Mm2t`、`/articles/VIP/Kcr8I81t` 地址已映射到新地址。主站域名的跳转需在正式迁移上线时另行配置。

## 新增文章

1. 在 `content.ts` 的 `articles` 中新增一项，遵循 `types.ts`。slug 发布后保持稳定。
2. 填入原始发布日期、摘要、阅读分钟、分类与关键词。分类可多选，数量按真实归属统计，因此各目录数量之和可能超过文章总数。
3. `body` 保存完整 Markdown；`preview` 保存显式试读内容，在完整 Markdown 块边界结束。不得把正文放入 public、客户端模块或列表 props。
4. `access` 可设为 `public` 或 `vip`。当前 VIP / VIP_PLUS 阅读会员全文；目录与摘要公开。不引入新的数据库或订阅计费规则。
5. 封面放在 `public/images/articles/`，建议 16:9；右上角保留 WiseInvest 作者签名。设置 `cover` 和准确的 `coverAlt`。
6. 运行 `npm run test:articles`、`npm run build`，再运行 `npm run test:auth:integration` 验证试读与登录权限。

服务端 `getContentViewerTier()` 沿用 Wise ID 主站的即时会员验证。文章页强制动态渲染；元数据与列表不包含正文。当前仓库若公开，提交的文章源码可直接被读取；服务端网页权限不等于 GitHub 源码保密。

## 迁移依据

- WGa8Mm2t / VIP001：2026-09-05，原站 35% 完整 Markdown 块试读。
- Kcr8I81t / VIP002：2026-09-12，原站公开期已于 2026-09-14 结束，恢复 30% 完整块试读。
- 正文逐字保留，文内历史观点与数据不因迁移而更新。新封面是编辑插画，不是文章中的事实图表。

## 首图与生成记录

使用内置 imagegen，为两篇文章分别生成 16:9 首图；参考主站真实头像。图像已落入项目，运行时不依赖图片生成服务。

- `public/images/articles/valuation-friction.png`：白、银、金的研究视觉；AI 芯片、数据中心与克制的金色弧线呈现产业增长和估值摩擦，辅以 Bitcoin 与黄金。标题「市场没结束 / 估值摩擦期」，右上角圆形作者头像与 WiseInvest。
- `public/images/articles/fed-cycle.png`：同样的白金体系；美联储建筑与环形路径连接股票、Bitcoin、黄金，呈现政策传导。标题「读懂美联储 / 看清资产的变化」，右上角圆形作者头像与 WiseInvest。
- `public/images/articles/wise-avatar.png`：主站原头像，用于文章作者信息，不是生成素材。

两张首图均为编辑插画，无收益数字或回报承诺。后续生成保持这一组作者位置、配色和比例。
