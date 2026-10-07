# Wise VIP

Independent public VIP landing page. Original files from `../source` are preserved byte for byte.

## Run

Node 22, `npm ci`, `npm run build`, `npm start`.

## Deployment

Vercel project: `wise-vip` in `wiseinvest513s-projects`.
Primary domain: `vip.wise-invest.org`.

`/` renders the original VIP page. `/vip` remains available. Login, registration, account, article, perk, point and website routes redirect to `https://www.wise-invest.org`, preserving paths and queries.

The landing page has no membership database or local sign-in. It renders the original guest view and public partner defaults. Membership verification and protected content remain on the main site.

Added runtime files: root layout/home route, inherited main-site global CSS and Tailwind config, build/package configuration, public auth/database adapters and redirects. No original VIP page, component, library or image was edited.
