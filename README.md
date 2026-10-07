# Wise VIP

Next.js website for Wise VIP, deployed to `https://vip.wise-invest.org` through the Vercel project `wise-vip` in `wiseinvest513s-projects`. GitHub repository: `WiseInvest513/vip`, production branch: `main`.

## Local development and checks

Use Node.js 22. Run `npm ci`, `npm run test:auth`, and `npm run build`. Start a local preview with `npm start` (or `npm run dev` for development).

Copy `.env.example` to `.env.local` and configure Wise ID credentials when testing real login. Never commit environment files, tokens, raw chat exports or local account data.

## Pages and content access

- `/`: introduction to the VIP site.
- `/chat`: ten curated principles and ten discussions. Visitors and ordinary members receive only the first three principles. VIP and VIP+ members receive all ten.
- `/chat/[slug]`: the fixed free articles are `investment-principles`, `macro-observation`, and `research-fewer-products`. Other articles require VIP or VIP+. Lists and locked pages expose only public introductions; protected bodies stay on the server. Newly added articles are VIP-only unless explicitly added to `lib/auth/discussion-access.ts`.
- `/learn`: public research tools, data websites and official sources.
- `/join` and `/vip`: membership information and joining instructions.
- `/login`: Wise ID OIDC sign-in, returning to the requested internal page.

Account and membership data remain on the main site. There is no local membership database. The server verifies each request against the main-site userinfo endpoint; expired credentials, identity mismatches and verification failures do not grant VIP access. Pages containing membership-dependent content are dynamic and must not be statically cached.

## Deployment

The repository is linked to Vercel for production deployment from `main`. Production environment variables are managed in Vercel; `.env.local` is for local use. After deployment, verify the custom domain, free and protected article routes, login redirect and image optimization. Changes must not be pushed without the user's authorization.

VIP article bodies are embedded in server-only source files. Do not push these files to a public repository: make the repository private before synchronizing them. A local Vercel production deployment can publish the site without exposing these files on GitHub.

Pinned transitive dependency overrides keep Next.js 15 on patched PostCSS and Sharp releases. Re-run build, image and auth checks when changing these versions.

The production dependency audit is clean for this release. The Tailwind 3 build-only dependency tree still reports pattern/selector parsing denial-of-service advisories; it processes checked-in, trusted source, not user-supplied CSS or glob patterns. A Tailwind major-version migration is separate work and requires visual regression testing.

The original imported material remains in the sibling `../source` directory; the maintained runtime is this directory.
