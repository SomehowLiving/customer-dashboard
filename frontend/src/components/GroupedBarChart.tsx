import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import { formatCurrency } from '../utils/format';
import { COLORS } from '../utils/colors';

type Props = {
  data: any[];
  keys?: string[];
};

const GroupedBarChart = ({ data, keys }: Props) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Detect keys from one of the grouped sections if not passed
  const detectedKeys =
    keys ||
    Object.keys(data[0]?.teams || data[0]?.industries || data[0]?.ranges || {}).slice(0, 6);

  // Flatten the data for Recharts
  const flattenedData = data.map((item) => {
    const section = item.teams || item.industries || item.ranges || {};
    const row: any = { quarter: item.quarter };
    detectedKeys.forEach((key) => {
      row[key] = section[key]?.acv || 0;
    });
    return row;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        style={{
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 10,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <strong>{label}</strong>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={flattenedData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quarter" />
        <YAxis tickFormatter={formatCurrency} />
        <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
        <Legend />
        {detectedKeys.map((key, idx) => (
          <Bar
            key={key}
            dataKey={key}
            fill={COLORS[idx % COLORS.length]}
            barSize={30}
          />
        ))}
        
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default GroupedBarChart;
