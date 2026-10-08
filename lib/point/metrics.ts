export function priceChange(start: number, end: number): number | null {
  if (!Number.isFinite(start) || !Number.isFinite(end) || start <= 0 || end <= 0) return null;
  return (end / start - 1) * 100;
}
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 3 }).format(value);
}
export function formatChange(value: number | null): string {
  return value === null ? '暂缺数据' : `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}
