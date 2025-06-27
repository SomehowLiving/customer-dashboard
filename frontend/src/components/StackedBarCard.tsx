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
import ChartTooltip from './CustomTooltip';
import CustomLabel from './CustomLabel';
import { formatChartData } from '../utils/dataTransform';
import { CATEGORY_COLORS } from '../utils/colors';
const COLORS= CATEGORY_COLORS;

const StackedBarChart = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) return <p>No data available</p>;
const formattedData = formatChartData(data, {
  mode: 'stacked',
});

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={formattedData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        {/* <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" /> */}
        <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
        <XAxis dataKey="quarter" />
        <YAxis tickFormatter={(val) => formatCurrency(val)} />
        <Tooltip cursor={{ fill: 'transparent' }} content={<ChartTooltip />} />
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
