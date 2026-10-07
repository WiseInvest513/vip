# Wise VIP 主站登录

VIP 无数据库、无账号表、无独立注册。主站通过 OIDC 授权码 + PKCE、state、nonce 完成登录。Auth.js 的加密 HttpOnly、SameSite=Lax Cookie 只保留会话和主站短期令牌，生产启用 Secure；不会把 access token 返回给浏览器脚本。用户资料和会员等级每次从主站 userinfo 实时读取，服务端判断阅读权限。退出仅清除 VIP 本站登录，不注销主站。

主站 access token 有效期一小时，目前无 refresh token；到期需再次通过主站授权。会员降级、账户删除、主站异常或身份不匹配均不开放 VIP 正文。不使用开发预览 Cookie 授予访问权限。页头和正文共享同一次请求的身份检查。

## 接入剩余配置

在主站 `/admin/sso` 新建独立的 Wise VIP 客户端（不复用 CHAIN 的 secret），启用 PKCE，允许 scopes `openid profile email wise.membership`。精确登记回调：

- 本地：`http://localhost:3010/api/auth/callback/wise`
- 正式：`https://vip.wise-invest.org/api/auth/callback/wise`

将 client ID 和一次性显示的 secret 填入本机 `.env.local` 对应项，不提交、不在聊天里发送。开发与正式建议分别建客户端。`.env.example` 为配置模板；AUTH_SECRET 每个环境独立生成。正式 AUTH_URL 使用 `https://vip.wise-invest.org`，不要使用 localhost。

已核验正式 discovery 的 issuer 是 `https://wise-invest.org`（无 www），而 discovery、authorize、token、userinfo 在 `https://www.wise-invest.org`。两项配置需保持模板所示值。

部署需要在 Vercel Production 配置以上环境变量；密钥不得进入 Git。缺少独立客户端 ID/secret 时，登录页显示接入中，不提供假登录。

## 验证

`npm run test:auth` 验证外部跳转防护、会员降级、失效令牌、身份不匹配、服务异常和缺失配置；`npm run build` 验证 Next 构建。

拿到客户端配置后用 `npm run dev -- --port 3010`，访问 `http://localhost:3010/login`，依次使用普通会员和 VIP 登录；检查原文章回跳、完整正文权限、主站降级后刷新、退出后正文隐藏，以及浏览器 `/api/auth/session` 无令牌字段。没有实际客户端凭据之前，不能声称真实 SSO 已联调成功。
