// Opt-in for the loopback-only `npm run preview` server. A request header alone
// must never unlock content, and deployed Vercel builds always use membership.
export function isLocalArticlePreview(
  host: string | null,
  environment: Record<string, string | undefined>,
): boolean {
  return environment.WISE_VIP_LOCAL_PREVIEW === "1"
    && !environment.VERCEL
    && !environment.CI
    && /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host ?? "");
}
