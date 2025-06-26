// src/components/BarChart.tsx
import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/format';
import { COLORS } from '../utils/colors';

type Props = {
  data: any[];
  keys?: string[];
};

const BarChart = ({ data, keys }: Props) => {
  if (!data || data.length === 0) return <p>No data</p>;

  // Auto-detect keys (e.g., industry, team, etc.)
  const detectedKeys =
    keys ||
    Object.keys(data[0]?.industries || data[0]?.teams || data[0]?.ranges || {}).slice(0, 4);

  // Flattened format for Recharts
  const flattenedData = data.map((item) => {
    const row: any = { quarter: item.quarter };
    const section = item.industries || item.teams || item.ranges || {};
    
  const total = detectedKeys.reduce((sum, key) => sum + (section[key]?.acv || 0), 0) || 1;

  detectedKeys.forEach((key) => {
    const value = section[key]?.acv || 0;
    row[key] = value;
    row[`${key}_pct`] = `${Math.round((value / total) * 100)}%`;
  });

  return row;
});

const CustomLabel = ({ x, y, width, value, fill }: any) => {
  if (!value || value === '0%') return null; // Skip 0%
  const labelX = x + width / 2;
  const labelY = y + 14;
  return (
    <text x={labelX} y={labelY} fill={fill || '#fff'} textAnchor="middle" fontSize={11}>
      {value}
    </text>
  );
};

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '10px 12px',
          transform: 'translateY(-4px)',
          transition: 'all 0.2s ease',
        }}
      >
        <strong>{label}</strong>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ReBarChart
        data={flattenedData}
        margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
      >
        <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
        <XAxis dataKey="quarter" />
        <YAxis tickFormatter={(val) => formatCurrency(val)} />
        <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
        <Legend />
        {detectedKeys.map((key, idx) => (
  <Bar
    key={key}
    dataKey={key}
    stackId="a"
    fill={COLORS[idx % COLORS.length]}
    activeBar={{
      style: {
        filter: 'drop-shadow(0 0 6px rgba(0, 0, 0, 0.2))',
        transform: 'scale(1.04)',
        transition: 'all 0.3s ease',
      },
    }}
  >
    <LabelList dataKey={`${key}_pct`} content={(props) => <CustomLabel {...props} fill="#fff" />} />
  </Bar>
))}
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;