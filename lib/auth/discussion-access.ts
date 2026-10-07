// Stable free articles: filtering, sorting and URL parameters cannot change access.
export const FREE_DISCUSSION_SLUGS: readonly string[] = [
  "investment-principles",
  "macro-observation",
  "research-fewer-products",
];

export function isFreeDiscussion(slug: string) {
  return FREE_DISCUSSION_SLUGS.includes(slug);
}

export function canReadDiscussion(slug: string, verifiedTier: string | null) {
  return isFreeDiscussion(slug) || verifiedTier === "VIP" || verifiedTier === "VIP_PLUS";
}
