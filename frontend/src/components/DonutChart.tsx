// src/components/DonutChart.tsx
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  data: any[]; // customerData, acvRangeData, etc.
  category?: 'customer' | 'range' | 'team' | 'industry';
};

const COLORS = ['#1976d2', '#ef6c00', '#43a047', '#9c27b0', '#f44336', '#ff9800'];

const DonutChart = ({ data, category = 'customer' }: Props) => {
  if (!data || data.length === 0) return <p>No data</p>;

  // Flatten and summarize the relevant part
  let pieData: { name: string; value: number }[] = [];

  if (category === 'customer') {
    // data has .existing and .new per quarter
    let existing = 0;
    let newCust = 0;
    data.forEach((q) => {
      existing += q.existing.acv;
      newCust += q.new.acv;
    });
    pieData = [
      { name: 'Existing Customer', value: existing },
      { name: 'New Customer', value: newCust },
    ];
  } else {
    // handle team / industry / acv-range
    const sumMap: Record<string, number> = {};
    data.forEach((q) => {
      const group = q.teams || q.industries || q.ranges;
      Object.entries(group).forEach(([name, val]: any) => {
        sumMap[name] = (sumMap[name] || 0) + val.acv;
      });
    });
    pieData = Object.entries(sumMap).map(([name, value]) => ({ name, value }));
  }

  const total = pieData.reduce((acc, item) => acc + item.value, 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          label={({ name, value }) => {
            const safeValue = value ?? 0; // fallback if value is undefined
            return `${name}: $${(safeValue / 1000).toFixed(1)}K (${Math.round(
                (safeValue / total) * 100
            )}%)`;
          }}

        >
          {pieData.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
