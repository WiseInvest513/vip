// Public landing page only. Authentication remains on the main Wise site.
export async function auth(): Promise<{user: {id: string; membershipTier?: string}} | null> { return null; }
