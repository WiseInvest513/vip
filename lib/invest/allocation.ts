export const allocationPresets = [
  { id: "dca", label: "只做定投", dca: 100, margin: 0 },
  { id: "long-term", label: "定投 + 长线", dca: 50, margin: 0 },
  { id: "with-margin", label: "含合约示例", dca: 30, margin: 20 },
] as const;

export const allocationAmountLimit = 100_000_000;

function clamp(value: number, maximum: number) {
  return Math.min(maximum, Math.max(0, Number.isFinite(value) ? value : 0));
}

/** Keep allocations mutually exclusive and the full planned capital at 100%. */
export function calculateAllocation(amount: number, dcaPercent: number, marginPercent: number, leverage = 2) {
  const margin = Math.round(clamp(marginPercent, 30));
  const dca = Math.round(clamp(dcaPercent, 100 - margin));
  const longTerm = 100 - dca - margin;
  const totalCents = Math.round(clamp(amount, allocationAmountLimit) * 100);
  const marginCents = Math.round(totalCents * margin / 100);
  const dcaCents = Math.min(totalCents - marginCents, Math.round(totalCents * dca / 100));
  const longTermCents = totalCents - dcaCents - marginCents;
  const multiple = [2, 3, 5].includes(leverage) ? leverage : 2;

  return {
    total: totalCents / 100,
    dca: { percent: dca, amount: dcaCents / 100 },
    longTerm: { percent: longTerm, amount: longTermCents / 100 },
    margin: { percent: margin, amount: marginCents / 100 },
    leverage: multiple,
    exposure: marginCents * multiple / 100,
  };
}
