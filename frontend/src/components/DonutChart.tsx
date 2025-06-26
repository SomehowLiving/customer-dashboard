import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { formatCurrency} from '../utils/format';
import {COLORS} from '../utils/colors';

type Props = {
  data: any[]; // customerData, acvRangeData, etc.
  category?: 'customer' | 'range' | 'team' | 'industry';
};

const DonutChart = ({ data, category = 'customer' }: Props) => {
  if (!data || data.length === 0) return <p>No data</p>;

  // Flatten and summarize the relevant part
  let pieData: { name: string; value: number }[] = [];

  if (category === 'customer') {
    // data has .existing and .new per quarter
    let existing = 0;
    let newCust = 0;
    data.forEach((q) => {
      existing += q.existing?.acv || 0;
      newCust += q.new?.acv || 0;
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
        const acv = val?.acv || 0;
        sumMap[name] = (sumMap[name] || 0) + acv;
      });
    });
    pieData = Object.entries(sumMap).map(([name, value]) => ({ name, value }));
  }

  const total = pieData.reduce((acc, item) => acc + item.value, 0);

  const renderCenterText = (total: number) => {
  return (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: '16px', fontWeight: 600 }}
    >
      Total
      <tspan x="50%" dy="1.4em" fontSize="14px" fontWeight="500">
        {formatCurrency(total)}
      </tspan>
    </text>
  );
};

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
          label={false}
        >
          {pieData.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        {/* Center label */}
        {renderCenterText(total)}
        <Tooltip
          formatter={(value: any) => formatCurrency(value)}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
