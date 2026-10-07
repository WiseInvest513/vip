import { mapWiseProfileToUser, type WiseIdProfile } from "./wise-id";

// Every authorization decision uses fresh main-site data; outages fail closed.
export async function verifyMembership(accessToken: string | undefined, expiresAt: number | undefined, subject: string | undefined, endpoint: string, request: typeof fetch = fetch) {
  if (!accessToken || !subject || !expiresAt || expiresAt <= Date.now() / 1000) return null;
  try {
    const response = await request(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store",
      redirect: "error", signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const profile: WiseIdProfile = await response.json();
    if (profile.sub !== subject) return null;
    return mapWiseProfileToUser(profile);
  } catch { return null; }
}
