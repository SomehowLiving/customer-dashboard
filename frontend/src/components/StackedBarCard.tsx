import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/format';

const COLORS = {
  existing: '#1976d2',
  new: '#ef6c00',
};

const StackedBarChart = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const formattedData = data.map((q) => {
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

  
  const CustomLabel = ({ x, y, width, height, value, fill }: any) => {
    if (!value || height < 20) return null;
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        fill="#fff"
        fontSize={12}
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={formattedData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        {/* <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" /> */}
        <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
        <XAxis dataKey="quarter" />
        <YAxis tickFormatter={(val) => formatCurrency(val)} />
        <Tooltip
          formatter={(value: any) => formatCurrency(value)}
          labelStyle={{ fontWeight: 'bold' }}
          cursor={{ fill: 'transparent' }}
        />
        <Bar dataKey="existing" stackId="a" fill={COLORS.existing} >
          <LabelList dataKey="existingPct" content={(props) => <CustomLabel {...props} fill="#fff" />} />
        </Bar>
        <Bar dataKey="new" stackId="a" fill={COLORS.new}>
          <LabelList dataKey="newPct" content={(props) => <CustomLabel {...props} fill="#fff" />} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
