import { auth } from "@/auth";
export async function getContentViewerTier(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ? session.user.membershipTier : null;
}
