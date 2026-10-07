type PublicPartner = typeof import("./vip/partners").defaultWiseVipPartners[number] & {id: string};
export function isDatabaseConfigured() { return false; }
export function getPrisma(): {partner: {findMany: (query: unknown) => Promise<PublicPartner[]>}} {
  throw new Error("Membership persistence belongs to the main Wise site.");
}
