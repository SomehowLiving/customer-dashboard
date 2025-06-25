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

type Props = {
  data: any[];
  keys?: string[]; // optional custom keys
};

const BarChart = ({ data, keys }: Props) => {
  if (!data || data.length === 0) return <p>No data</p>;

  // auto-detect keys if not passed
  const detectedKeys =
    keys ||
    Object.keys(data[0].industries || data[0].teams || data[0].ranges || {}).slice(0, 2);

  const flattenedData = data.map((item) => {
    const row: any = { quarter: item.quarter };
    const section = item.industries || item.teams || item.ranges || {};
    detectedKeys.forEach((key) => {
      row[key] = section[key]?.acv || 0;
    });
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={flattenedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quarter" />
        <YAxis />
        <Tooltip />
        <Legend />
        {detectedKeys.map((key, idx) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="a"
            fill={['#1976d2', '#ef6c00', '#43a047', '#9c27b0'][idx % 4]}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
