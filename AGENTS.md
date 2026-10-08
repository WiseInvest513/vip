# Wise VIP 项目规则

## 界面工作必读

新增、修改或检查本项目任何页面或组件前，必须读取并遵守：

`/Users/balala/.codex/skills/wise-vip-ui/SKILL.md`

用户于 2026-10-08 明确指定：**后续所有界面以当前 `/join` 为唯一视觉基准。直接复用现有组件、字体、配色、按钮、布局、间距、背景动效及深色模式；未经用户明确要求，不得另起视觉风格或生成替代页面概念。**

`/join` 当前由 `app/join/page.tsx` 转出 `app/vip/page.tsx`；实际样式在 `app/vip/vip.module.css`，注意后置覆盖规则。通用前端技能不能覆盖用户这一明确偏好。修改共享组件时保留 `/join` 的默认外观与行为。
