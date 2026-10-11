# 黑石 AI 文章配图生成记录

2026-10-11，通过内置 imagegen 生成及编辑。封面保留既有银白玻璃风格和作者头像；正文采用用户批准的米白、深蓝、香槟金立体风格，人物参与实际工作。正文右上角仅使用 WiseInvest 衬线字标，大写 W、I 为金色，其余字母为深蓝，不使用独立 WI 连字图标。

封面沿用现有 1600 × 900 WebP（质量 85，约 140 KiB）。最终五张正文图为 1600 × 900 WebP，质量 80，合计约 399 KiB。发布资源位于 `public/images/articles/`；原 PNG 和实际生成记录位于 `review/blackstone-ai-illustrations/series/`。sharp 仅用于等比缩放、格式转换和压缩。

| 正文资源 | 位置 | 图意 |
|---|---|---|
| `blackstone-ai-commissioning.webp` | 第三个重点后 | 设备仍需调试与配套验证 |
| `blackstone-ai-workflow.webp` | 第五个重点后 | AI 协助比对，人工复核异常 |
| `blackstone-ai-returns.webp` | 第二节末尾 | 应用与设施两本账分别核算 |
| `blackstone-ai-adoption.webp` | 第三节末尾 | 部分岗位运行，其他流程仍在接入 |
| `blackstone-ai-research.webp` | 第四节末尾 | 业务增长来源不同，但需检查共同风险 |

所有正文图均为通用概念示意，不是黑石、具体公司、设备或个人的官方照片；模型数量不代表统计数据，未绘制收益曲线或虚构回报。

## cover

```text
Create one polished 16:9 landscape editorial article cover for Wise VIP. Image 1 is ONLY reference for existing cover layout, title size, silver-white + champagne gold visual family. Image 2 is the exact author's photo; preserve the face and sunglasses in a small circular portrait crop at the top right with the exact label "WiseInvest", like reference 1. The subject is Blackstone's eight observations about AI capital expenditure, real enterprise returns, and the next phase of industrial opportunities. Primary Chinese title on left in very clear bold dark sans-serif, two lines exactly "黑石的八个判断" / "AI 的大航海时代" (second line muted champagne gold). Small eyebrow above: "WISE VIP · 市场手记". A restrained physically credible silver and glass exploration ship with white sails at right, sailing across a smooth glass-blue research table; behind it a small silver-white data center and clean power infrastructure subtly suggest economic infrastructure. The ship is a metaphor for exploring broad AI adoption, not literal Blackstone operations. Beautiful modern white studio daylight, soft natural shadows, fine gold route line on the surface, no gold coins, no stock arrows, no performance charts, no invented figures or company logos, no Blackstone endorsement. Keep left title space uncluttered, 50% subject right, title and author inside safe margins. Match existing website white-gold cover style exactly. No UI screenshot, no document mockup, no extra copy.
```

## 正文图

### commissioning

第一张从用户批准的参考图编辑定稿，呈现技术人员检查机柜、连接散热模块，设备仍在调试的场景。最终使用批准的 WiseInvest 字标。未保存可确认的第一张原始生成提示词，因此此处仅记录编辑来源，不补写提示词。

风格及署名参考：
- `review/wiseinvest-signature/commissioning-wordmark-preview-v2.png`
- `review/wiseinvest-signature/wiseinvest-wordmark-v2.png`

以下四项保留已选系列记录中的实际生成提示词。

### workflow

Use case: stylized-concept, article-body editorial illustration. Create ONE opaque landscape 16:9 image.
The attached IMAGE 1 is a STYLE reference: reproduce tactile miniature real-object rendering, warm ivory enclosures, muted deep navy, restrained champagne gold, natural adult human proportions, soft studio light and short contact shadows. Do not reproduce its server scene.
IMAGE 2 is the APPROVED AUTHOR WORDMARK reference. Include ONLY this exact serif WiseInvest wordmark in the top-right blank margin, visible width about 15% of canvas width. Capital W and capital I champagne gold, all lowercase letters navy. No separate WI monogram. Do not add any other brand.
Palette: warm white / ivory #F5F0E6, deep navy #263B54, sparse brushed champagne metal #B69450. Materials: thick paper, tactile fabric, matte painted metal, ceramic-like equipment housing where appropriate. Not transparent glass or shiny toy plastic.
Composition: one coherent miniature scene, not a row of equal icons; nearly frontal slight three-quarter depth, weak perspective; full objects visible; scene occupies about 65–70% frame height, balanced generous white space, upper right clear for signature. Opaque clean warm-white background, no room walls or decorative pedestal. No giant title, thick arrows, cards, coins, growth charts, invented numeric data, fake logos, cartoons presenting to the viewer, or unrelated decorative objects. People do actual relevant work.

Scene and meaning: AI can extract and compare contract information, while a human still reviews ambiguous clauses and makes the final decision. A compact ivory office desk, one navy-screen monitor and a thick cream open contract binder. A naturally proportioned adult female analyst in a muted navy jacket and ivory blouse sits at the desk, turned three-quarters toward the monitor, holding a paper page and using a pen to inspect a highlighted clause in the open binder. Monitor shows a simple document preview with a few cream lines and two gold-highlighted fields, NOT checkmarks approving everything. An additional loose page with one unresolved gold-outlined field lies beside the binder, suggesting review in progress. Keep screens and papers abstract, no readable text or numbers except the approved WiseInvest author signature. No humanoid robot. Human and computer clearly share ONE task. Desk modest and tactile, chair upholstered deep navy, no office clutter. This is a generic conceptual workflow, not a portrait or an actual vendor product.

### returns

Use case: stylized-concept, article-body editorial illustration. Create ONE opaque landscape 16:9 image.
The attached IMAGE 1 is a STYLE reference: reproduce tactile miniature real-object rendering, warm ivory enclosures, muted deep navy, restrained champagne gold, natural adult human proportions, soft studio light and short contact shadows. Do not reproduce its server scene.
IMAGE 2 is the APPROVED AUTHOR WORDMARK reference. Include ONLY this exact serif WiseInvest wordmark in the top-right blank margin, visible width about 15% of canvas width. Capital W and capital I champagne gold, all lowercase letters navy. No separate WI monogram. Do not add any other brand.
Palette: warm white / ivory #F5F0E6, deep navy #263B54, sparse brushed champagne metal #B69450. Materials: thick paper, tactile fabric, matte painted metal, ceramic-like equipment housing where appropriate. Not transparent glass or shiny toy plastic.
Composition: one coherent miniature scene, not a row of equal icons; nearly frontal slight three-quarter depth, weak perspective; full objects visible; scene occupies about 65–70% frame height, balanced generous white space, upper right clear for signature. Opaque clean warm-white background, no room walls or decorative pedestal. No giant title, thick arrows, cards, coins, growth charts, invented numeric data, fake logos, cartoons presenting to the viewer, or unrelated decorative objects. People do actual relevant work.

Scene and meaning: an enterprise AI project's economics and the infrastructure owner's capital recovery must be calculated separately. One analyst's ivory desk supports TWO distinct open thick-paper accounting ledgers placed side by side. On the left ledger's top edge rests a small generic ivory/navy laptop with a document symbol (application user); on the right ledger's top edge rests a small detailed navy-and-ivory data-center architectural scale model (infrastructure owner). The model and laptop are subordinate explanatory props, not a parade of equal icons. Each ledger has its own pencil and a few abstract rows, absolutely NO amounts, percentage returns, completed checkmarks or climbing bars. A naturally proportioned adult analyst sits slightly behind and between the ledgers, using a simple calculator and making a note in one ledger, clearly comparing two separate accounts. A small cream desk calendar beside the facility ledger subtly conveys its recovery timeline; it has abstract blank boxes and no readable dates. Include only two short small editorial paper-tab labels if legible: left "应用", right "设施". No other text except the exact approved top-right WiseInvest wordmark. Do not connect the ledgers with arrows or money; one project's return does not automatically imply the other's profitability. Sparse coherent scene, very legible at article size.

### adoption

Use case: stylized-concept, article-body editorial illustration. Create ONE opaque landscape 16:9 image.
The attached IMAGE 1 is a STYLE reference: reproduce tactile miniature real-object rendering, warm ivory enclosures, muted deep navy, restrained champagne gold, natural adult human proportions, soft studio light and short contact shadows. Do not reproduce its server scene.
IMAGE 2 is the APPROVED AUTHOR WORDMARK reference. Include ONLY this exact serif WiseInvest wordmark in the top-right blank margin, visible width about 15% of canvas width. Capital W and capital I champagne gold, all lowercase letters navy. No separate WI monogram. Do not add any other brand.
Palette: warm white / ivory #F5F0E6, deep navy #263B54, sparse brushed champagne metal #B69450. Materials: thick paper, tactile fabric, matte painted metal, ceramic-like equipment housing where appropriate. Not transparent glass or shiny toy plastic.
Composition: one coherent miniature scene, not a row of equal icons; nearly frontal slight three-quarter depth, weak perspective; full objects visible; scene occupies about 65–70% frame height, balanced generous white space, upper right clear for signature. Opaque clean warm-white background, no room walls or decorative pedestal. No giant title, thick arrows, cards, coins, growth charts, invented numeric data, fake logos, cartoons presenting to the viewer, or unrelated decorative objects. People do actual relevant work.

Scene and meaning: a company using AI in one role is not yet a company whose entire workflow is integrated. A sparse miniature CUTAWAY OFFICE viewed almost frontally with gentle depth, with a low ivory partition separating two connected work areas. On one side a seated business worker is already comparing a paper contract with a navy monitor showing a simple document preview. On the other side a standing IT specialist in navy workwear is actively connecting an ivory shared data/filing cabinet to a second desk terminal via a neat physical cable. The second terminal remains dark and an open configuration clipboard sits beside it; the cabinet is not magically disappearing. One central cream shared document tray physically belongs between the two areas. Present an ongoing organizational implementation, part in use and part under adjustment; do NOT show percentage progress or imply every workflow is finished. Natural adult proportions, small integrated people, full figures/desk silhouettes, compact miniature scene with ample white margin. No company names or office signage. This is a conceptual example, no numerical adoption rates are represented. No rising graph, no glowing network web, no robot. All scene elements in focus. Exact approved WiseInvest-only wordmark top-right.

### research

Use case: stylized-concept, article-body editorial illustration. Create ONE opaque landscape 16:9 image.
The attached IMAGE 1 is a STYLE reference: reproduce tactile miniature real-object rendering, warm ivory enclosures, muted deep navy, restrained champagne gold, natural adult human proportions, soft studio light and short contact shadows. Do not reproduce its server scene.
IMAGE 2 is the APPROVED AUTHOR WORDMARK reference. Include ONLY this exact serif WiseInvest wordmark in the top-right blank margin, visible width about 15% of canvas width. Capital W and capital I champagne gold, all lowercase letters navy. No separate WI monogram. Do not add any other brand.
Palette: warm white / ivory #F5F0E6, deep navy #263B54, sparse brushed champagne metal #B69450. Materials: thick paper, tactile fabric, matte painted metal, ceramic-like equipment housing where appropriate. Not transparent glass or shiny toy plastic.
Composition: one coherent miniature scene, not a row of equal icons; nearly frontal slight three-quarter depth, weak perspective; full objects visible; scene occupies about 65–70% frame height, balanced generous white space, upper right clear for signature. Opaque clean warm-white background, no room walls or decorative pedestal. No giant title, thick arrows, cards, coins, growth charts, invented numeric data, fake logos, cartoons presenting to the viewer, or unrelated decorative objects. People do actual relevant work.

Scene and meaning: memory, cloud platforms and power/cooling businesses have different economics, yet researchers must inspect their shared dependence on the AI investment cycle.
A compact collaborative research worktable seen from a modestly elevated three-quarter angle, less close-up than other images. Two naturally proportioned adult researchers stand at adjacent sides of the table, looking DOWN together at ONE large cream printed data-center procurement and construction plan. One points a pen to a portion of the plan, the other checks a navy-bound notebook; neither addresses the viewer. Keep people relatively small, integrated into the scene.
Only three tangible study props rest naturally at different corners of the SAME paper plan: a small generic memory circuit module with ivory chip packages and gold contacts, a small navy-screen cloud-service terminal with a restrained abstract window (no brand logo), and a small ivory/navy power-and-cooling equipment scale model with readable fan detail. They are deliberately subordinate to the shared plan, not isolated on pedestals, not three equal trading cards. The plan has understated navy floorplan lines and a few blank cost rows, no invented figures, prices, returns or ticker symbols. The shared document conveys common exposure without promising gains. Warm ivory tabletop, sparse navy leather notebook, a single gold pen; clean white studio backdrop, generous margins, no wall or extraneous furniture. No arrows, coins, shields, growth chart, company logos or big titles. Top-right only the approved serif WiseInvest wordmark, W and I gold, all other letters navy.
