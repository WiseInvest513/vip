export type CompoundInputs = {
  initial: number;
  monthly: number;
  annualRate: number;
  years: number;
};

export type CompoundYear = {
  year: number;
  contributed: number;
  balance: number;
};

export const compoundDefaults: CompoundInputs = {
  initial: 10_000,
  monthly: 1_000,
  annualRate: 8,
  years: 10,
};

export const compoundLimits = {
  initial: { min: 0, max: 10_000_000 },
  monthly: { min: 0, max: 1_000_000 },
  annualRate: { min: -20, max: 30 },
  years: { min: 1, max: 40 },
} as const;

export function normalizeCompoundInputs(input: CompoundInputs): CompoundInputs {
  const clamp = (value: number, key: keyof CompoundInputs) => {
    const finite = Number.isFinite(value) ? value : compoundDefaults[key];
    return Math.min(compoundLimits[key].max, Math.max(compoundLimits[key].min, finite));
  };

  return {
    initial: clamp(input.initial, "initial"),
    monthly: clamp(input.monthly, "monthly"),
    annualRate: clamp(input.annualRate, "annualRate"),
    years: Math.round(clamp(input.years, "years")),
  };
}

/** Fixed nominal annual rate, monthly compounding, deposits at each month end. */
export function calculateCompound(input: CompoundInputs) {
  const inputs = normalizeCompoundInputs(input);
  const monthlyRate = inputs.annualRate / 100 / 12;
  const points: CompoundYear[] = [{ year: 0, contributed: inputs.initial, balance: inputs.initial }];
  let balance = inputs.initial;

  for (let month = 1; month <= inputs.years * 12; month++) {
    balance = balance * (1 + monthlyRate) + inputs.monthly;
    if (month % 12 === 0) {
      points.push({ year: month / 12, contributed: inputs.initial + inputs.monthly * month, balance });
    }
  }

  const contributed = inputs.initial + inputs.monthly * inputs.years * 12;
  return {
    inputs,
    points,
    contributed,
    balance,
    profit: balance - contributed,
    effectiveAnnualRate: ((1 + monthlyRate) ** 12 - 1) * 100,
  };
}
