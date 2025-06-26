export const formatCurrency = (num: number) => `$${(num / 1000).toFixed(1)}K`;
export const formatPercent = (num: number, total: number) =>
  `${Math.round((num / total) * 100)}%`;
