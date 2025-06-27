type FormatChartDataOptions = {
  sectionKey?: 'industries' | 'teams' | 'ranges'; // for GroupedBar
  keys?: string[];                                // override keys
  mode?: 'grouped' | 'stacked';                   // differentiate logic
};

export const formatChartData = (rawData: any[], options: FormatChartDataOptions = {}) => {
  const { sectionKey, keys, mode = 'grouped' } = options;

  if (!rawData || rawData.length === 0) return [];

  if (mode === 'stacked') {
    return rawData.map((q) => {
      const existing = q.existing?.acv || 0;
      const newCust = q.new?.acv || 0;
      const total = existing + newCust;
      return {
        quarter: q.quarter,
        existing,
        new: newCust,
        existingPct: total > 0 ? `${Math.round((existing / total) * 100)}%` : '',
        newPct: total > 0 ? `${Math.round((newCust / total) * 100)}%` : '',
      };
    });
  }

  // Grouped Mode
  const detectedKey =
    sectionKey ||
    ['industries', 'teams', 'ranges'].find((key) => rawData[0][key]) ||
    '';

  if (!detectedKey) {
    console.warn('Could not detect sectionKey');
    return [];
  }

  const detectedKeys = keys || Object.keys(rawData[0][detectedKey] || {}).slice(0, 6);

  return rawData.map((item) => {
    const section = item[detectedKey] || {};
    const row: any = { quarter: item.quarter };
    const total = detectedKeys.reduce((sum, key) => sum + (section[key]?.acv || 0), 0) || 1;

    detectedKeys.forEach((key) => {
      const value = section[key]?.acv || 0;
      row[key] = value;
      row[`${key}_pct`] = `${Math.round((value / total) * 100)}%`;
    });

    return row;
  });
};
