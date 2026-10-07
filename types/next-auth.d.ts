import type { DefaultSession } from "next-auth";

import type { WiseMembershipTier } from "@/lib/auth/wise-id";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      wiseUserId: string;
      membershipTier: WiseMembershipTier;
    } & DefaultSession["user"];
  }

  interface User {
    wiseUserId?: string;
    membershipTier?: WiseMembershipTier;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    wiseUserId?: string;
    membershipTier?: WiseMembershipTier;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessExpiresAt?: number;
  }
}
