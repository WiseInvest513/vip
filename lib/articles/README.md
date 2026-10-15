# Wise VIP 研究文章

入口 `/article`，分类 `/article/category/{us-markets|earnings|companies|crypto}`，正文 `/article/{slug}`。

已有文章迁入 MyBlog/content/articles/VIP 的 001.md、002.md；主站原文件未移动、删除或发布重定向。VIP 站内旧 `/articles/VIP/WGa8Mm2t`、`/articles/VIP/Kcr8I81t` 地址已映射到新地址。主站域名的跳转需在正式迁移上线时另行配置。

## 新增文章

1. 在 `content.ts` 的 `articles` 中新增一项，遵循 `types.ts`。slug 发布后保持稳定。
2. 填入原始发布日期、摘要、阅读分钟、分类与关键词。分类可多选，数量按真实归属统计，因此各目录数量之和可能超过文章总数。
3. `body` 保存完整 Markdown；`preview` 保存显式试读内容，在完整 Markdown 块边界结束。不得把正文放入 public、客户端模块或列表 props。
4. `access` 可设为 `public` 或 `vip`。当前 VIP / VIP_PLUS 阅读会员全文；目录与摘要公开。不引入新的数据库或订阅计费规则。
5. 封面放在 `public/images/articles/`，建议 16:9；右上角保留 WiseInvest 作者签名。设置 `cover` 和准确的 `coverAlt`。
6. 运行 `npm run test:articles`、`npm run build`，再运行 `npm run test:auth:integration` 验证试读与登录权限。

服务端 `getContentViewerTier()` 沿用 Wise ID 主站的即时会员验证。文章页强制动态渲染；元数据与列表不包含正文。当前仓库若公开，提交的文章源码可直接被读取；服务端网页权限不等于 GitHub 源码保密。

## 本地全文预览

执行 `npm run build` 后运行 `npm run preview`，在 `http://127.0.0.1:3031/article` 查看全部文章，无需登录。页面标注「本地预览 · 完整文章」。预览进程仅监听本机回环地址；服务端要求显式 `WISE_VIP_LOCAL_PREVIEW=1`、回环 Host，且拒绝 Vercel/CI 环境。普通 `npm run start` 与线上部署仍按会员身份决定是否显示全文，不要在部署环境配置此预览变量。

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

## 2026-10-11 新增文章

- `blackstone-ai-age-of-discovery`：《黑石的八个判断：我们仍在AI的大航海时代》，原文由作者提供，存于 `blackstone-ai.ts`，分类仅 `us-markets`，25 分钟阅读，`vip` 全文。
- 保留文章原文与数字；增加 Markdown 标题层级、重点强调与五张概念插图。按作者要求，正文及试读移除段末来源链接及其站点标签；原有 23 处引用（17 个不同 URL）按正文顺序另存 `artwork/blackstone-ai-sources.md`，供内部编辑核对，不由网页导入。正常正文中的机构与品牌名称不变。原文标题作为页面标题，副标题作为摘要并保留在正文；移除末尾 ChatGPT `sandbox:` 导出引用残留。没有公开来源页面，因此 `sourceUrl` 留空。
- 显式 `preview` 包含前五个重点与前两张正文图，在第六个重点标题前截止；试读始终是完整正文的精确前缀。第六个重点及后续内容由服务端鉴权。
- 首图沿用 `/images/articles/blackstone-ai-cover.webp`。正文五图采用用户批准的米白、深蓝、香槟金立体风格，人物参与实际工作；右上角仅保留 WiseInvest 衬线字标，大写 W、I 为金色，其余字母为深蓝，不使用独立 WI 连字图标。五图均为通用概念示意，不是官方照片或数据图表。
- 正文图均位于 `/images/articles/`：`blackstone-ai-commissioning.webp` 放在第三个重点后，`blackstone-ai-workflow.webp` 放在第五个重点后，`blackstone-ai-returns.webp` 放在第二节末尾，`blackstone-ai-adoption.webp` 放在第三节末尾，`blackstone-ai-research.webp` 放在第四节末尾。
- 五张正文图压缩为 1600 × 900 WebP，质量 80，合计约 399 KiB；保留尺寸、延迟加载和原生图注。封面沿用现有资源与静态资源哈希缓存。生成及编辑记录见 `artwork/blackstone-ai-prompts.md`；第一张从批准参考图编辑定稿，其余四张保留实际生成提示词。

## 2026-10-12 新增文章

- `nebius-ai`：《看懂 NBIS：从 AI 算力到股东回报》，完整正文来自作者认可的 `drafts/NBIS公司深度解析-2026-10-12.txt`，存于 `nebius-ai.ts`。原题完整副标题保留在摘要中，「写在前面」与十一章保持十二个同级 Markdown 标题，原文措辞、财务数字和资料截止说明均保留。
- 复用已有 `companies`（公司研究）分类，AI、科技与数据中心作为标签；45 分钟阅读，`vip` 全文，`sourceUrl` 留空。
- 正文设置 `readingStyle: "editorial"`：每章选取 3–4 处短语加粗，共 40 处；八段作者解释使用引用块，均来自原文，不标注为公司引语；十二处较长段落在原有句号后增加换行。去除 Markdown 标记、图片及其说明并忽略空白后，与批准的原稿正文逐字相同，没有新增二级章节或重复财务表格。
- 显式 `preview` 是正文的精确前缀，仍以「但回到开头那家做 AI 客服的公司，它未必希望自己管理这些事情。」这一完整段落结束。去掉 Markdown 标记、图片及其说明和空白后，试读为 5,233 / 17,793 个可见字符（约 29.41%）；保留空白计算也低于 30%。后续正文沿用服务端 VIP / VIP_PLUS 鉴权，不向客户端发送全文计算比例。
- 封面路径为 `/images/articles/nebius-ai-cover.webp`，沿用既有文章封面与媒体映射机制。
- 四张正文图均为编辑概念示意，不包含真实财务数据或收益承诺：第三章 `nebius-ai-service.webp` 解释计算环境与模型运行服务，位于公开试读中，仅呈现第一章已经介绍的产品边界；第四章 `nebius-ai-value-chain.webp` 解释上下游关系；第七章 `nebius-ai-cashflow.webp` 解释设备投入、履约与回款的时间差；第十章 `nebius-ai-execution.webp` 解释从签约到容量使用的不同阶段。路径均在 `/images/articles/` 下，通过 Markdown 图片 title 显示图注，后三图均位于付费正文内。

- 同日按作者要求，在第十一章末尾补充一段投资态度引用块，明确文中固定价格下的等待倾向及上调/下调判断的条件；没有新增目标价、实时行情或持仓陈述。原有正文保留，新增结语后的纯文字副本为 `drafts/NBIS公司深度解析-2026-10-12-结语补充版.txt`。试读边界保持原完整段落；当前全文共九个引用块。
