// Main-site access tokens expire after one hour; there is no refresh token.
export const WISE_SESSION_MAX_AGE_SECONDS = 60 * 60;

export const DEFAULT_WISE_AUTH_SCOPE = "openid profile email wise.membership";

export type WiseMembershipTier = "MEMBER" | "VIP" | "VIP_PLUS";

export type WiseAuthEnvironment = {
  AUTH_SECRET?: string;
  AUTH_URL?: string;
  WISE_AUTH_ISSUER?: string;
  WISE_AUTH_DISCOVERY_URL?: string;
  WISE_AUTH_CLIENT_ID?: string;
  WISE_AUTH_CLIENT_SECRET?: string;
  WISE_AUTH_SCOPE?: string;
};

export type WiseIdProfile = {
  sub?: unknown;
  wise_user_id?: unknown;
  user_id?: unknown;
  email?: unknown;
  email_verified?: unknown;
  name?: unknown;
  picture?: unknown;
  membership_tier?: unknown;
};

function clean(value: string | undefined) {
  return value?.trim() ?? "";
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function normalizeWiseIssuer(value: string | undefined) {
  const candidate = clean(value);
  if (!candidate) return "";

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    if (url.username || url.password || url.search || url.hash) return "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return "";
  }
}

export function normalizeWiseScope(value: string | undefined) {
  const scopes = clean(value || DEFAULT_WISE_AUTH_SCOPE)
    .split(/\s+/)
    .filter(Boolean);
  const unique = Array.from(new Set(scopes));

  if (!unique.includes("openid")) unique.unshift("openid");
  return unique.join(" ");
}

export function resolveWiseOidcDiscoveryUrl(
  requestUrl: string,
  issuer: string,
  discoveryUrl: string,
) {
  if (!issuer || !discoveryUrl) return requestUrl;

  const issuerDiscoveryUrl = `${issuer.replace(/\/$/, "")}/.well-known/openid-configuration`;
  return requestUrl === issuerDiscoveryUrl ? discoveryUrl : requestUrl;
}

export function readWiseAuthSettings(environment: WiseAuthEnvironment) {
  const authUrl = normalizeWiseIssuer(environment.AUTH_URL);
  const issuer = normalizeWiseIssuer(environment.WISE_AUTH_ISSUER);
  const discoveryUrl = normalizeWiseIssuer(environment.WISE_AUTH_DISCOVERY_URL)
    || (issuer ? `${issuer}/.well-known/openid-configuration` : "");
  const clientId = clean(environment.WISE_AUTH_CLIENT_ID);
  const clientSecret = clean(environment.WISE_AUTH_CLIENT_SECRET);
  const authSecret = clean(environment.AUTH_SECRET);
  const missing: string[] = [];

  if (!authUrl) missing.push("AUTH_URL");
  if (!issuer) missing.push("WISE_AUTH_ISSUER");
  if (!clientId) missing.push("WISE_AUTH_CLIENT_ID");
  if (!clientSecret) missing.push("WISE_AUTH_CLIENT_SECRET");
  if (!authSecret) missing.push("AUTH_SECRET");

  return {
    authUrl,
    issuer,
    discoveryUrl,
    clientId,
    clientSecret,
    authSecret,
    scope: normalizeWiseScope(environment.WISE_AUTH_SCOPE),
    providerConfigured: Boolean(authUrl && issuer && clientId && clientSecret && authSecret),
    configured: missing.length === 0,
    missing,
  };
}

export function sanitizeInternalCallbackUrl(value: string | string[] | undefined, fallback = "/") {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//") || candidate.includes("\\") || /[\x00-\x20\x7f]/.test(candidate)) {
    return fallback;
  }

  try {
    const base = "https://wisevip.local";
    const url = new URL(candidate, base);
    if (url.origin !== base) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function normalizeMembershipTier(value: unknown): WiseMembershipTier {
  if (value === "VIP" || value === "VIP_PLUS") return value;
  return "MEMBER";
}

export function mapWiseProfileToUser(profile: WiseIdProfile) {
  const subject = optionalString(profile.sub) ?? optionalString(profile.wise_user_id);
  if (!subject) throw new Error("Wise ID did not return a subject identifier.");

  const wiseUserId = optionalString(profile.wise_user_id) ?? subject;
  const email = optionalString(profile.email);
  const name = optionalString(profile.name) ?? email ?? wiseUserId;

  return {
    id: subject,
    wiseUserId,
    membershipTier: normalizeMembershipTier(profile.membership_tier),
    name,
    email,
    image: optionalString(profile.picture),
  };
}
