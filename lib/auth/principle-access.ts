// Accept only the fresh, server-verified membership tier from content-viewer.
export const PUBLIC_PRINCIPLE_LIMIT = 3;

export function selectPrinciplesForViewer<T>(items: readonly T[], tier: string | null) {
  const hasFullAccess = tier === "VIP" || tier === "VIP_PLUS";
  return {
    hasFullAccess,
    visible: items.slice(0, hasFullAccess ? items.length : PUBLIC_PRINCIPLE_LIMIT),
    total: items.length,
  };
}
