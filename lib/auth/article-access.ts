export type ArticleAccess = "public" | "vip";

// Use only the fresh membership tier returned by the server's content viewer.
// New or malformed access labels fail closed until explicitly supported here.
export function canReadArticle(access: string, verifiedTier: string | null): boolean {
  if (access === "public") return true;
  if (access !== "vip") return false;
  return verifiedTier === "VIP" || verifiedTier === "VIP_PLUS";
}
