import NextAuth, { customFetch } from "next-auth";
import type { OIDCConfig } from "next-auth/providers";
import { cache } from "react";
import { wiseAuth } from "@/lib/auth/settings";
import { mapWiseProfileToUser, resolveWiseOidcDiscoveryUrl, WISE_SESSION_MAX_AGE_SECONDS, type WiseIdProfile } from "@/lib/auth/wise-id";
import { verifyMembership } from "@/lib/auth/membership";

const provider: OIDCConfig<WiseIdProfile> = {
  id: "wise", name: "Wise ID", type: "oidc",
  issuer: wiseAuth.issuer, wellKnown: wiseAuth.discoveryUrl,
  clientId: wiseAuth.clientId, clientSecret: wiseAuth.clientSecret,
  authorization: { params: { scope: wiseAuth.scope } },
  checks: ["pkce", "state", "nonce"], profile: mapWiseProfileToUser,
  [customFetch]: (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const resolved = resolveWiseOidcDiscoveryUrl(url, wiseAuth.issuer, wiseAuth.discoveryUrl);
    return fetch(resolved === url ? input : resolved, init);
  },
};
const nextAuth = NextAuth({
  providers: wiseAuth.configured ? [provider] : [],
  secret: wiseAuth.authSecret || undefined,
  trustHost: true,
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt", maxAge: WISE_SESSION_MAX_AGE_SECONDS },
  cookies: { sessionToken: {
    name: `${wiseAuth.authUrl.startsWith("https:") ? "__Secure-" : ""}wisevip.session-token`,
    options: { httpOnly: true, sameSite: "lax", path: "/", secure: wiseAuth.authUrl.startsWith("https:") },
  } },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Auth.js assigns user.id (and token.sub) a random local UUID.
        // The verified OIDC subject is retained on the provider account.
        token.wiseSubject = account.providerAccountId;
        token.accessToken = account.access_token;
        token.accessExpiresAt = account.expires_at ?? Math.floor(Date.now() / 1000) + 3600;
      }
      // Do not persist profile or membership snapshots in the session JWT.
      delete token.name; delete token.email; delete token.picture;
      return token;
    },
    async session({ session, token }) {
      const user = await verifyMembership(typeof token.accessToken === "string" ? token.accessToken : undefined, typeof token.accessExpiresAt === "number" ? token.accessExpiresAt : undefined, typeof token.wiseSubject === "string" ? token.wiseSubject : undefined,
        process.env.WISE_AUTH_USERINFO_URL || "https://www.wise-invest.org/oauth/userinfo");
      const sessionUser = user ?? { id: "", wiseUserId: "", membershipTier: "MEMBER", name: null, email: null, image: null };
      // Access token is server-only, never returned by /api/auth/session.
      return { ...session, user: sessionUser };
    },
  },
});
export const { handlers, signIn, signOut } = nextAuth;
export const auth = cache(async () => wiseAuth.configured ? nextAuth.auth() : null);
