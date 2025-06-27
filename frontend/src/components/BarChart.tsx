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
import CustomTooltip from './CustomTooltip';
import CustomLabel from './CustomLabel';
import { formatChartData } from '../utils/dataTransform';

type Props = {
  data: any[];
  keys?: string[];
};
const isMobile = window.innerWidth < 600;
const barSize = isMobile ? 20 : 36;

const BarChart = ({ data, keys }: Props) => {
  if (!data || data.length === 0) return <p>No data</p>;

  // Auto-detect keys (e.g., industry, team, etc.)
  const detectedKeys =
    keys ||
    Object.keys(data[0]?.industries || data[0]?.teams || data[0]?.ranges || {}).slice(0, 4);

const flattenedData = formatChartData(data, {
  sectionKey: 'industries', // or 'teams' / 'ranges'
  keys, // optional
});


  return (
    <ResponsiveContainer width="100%" height={400}>
      {/* <ReBarChart
        data={flattenedData}
        margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
      > */}
      <ReBarChart data={flattenedData} margin={{ top: 10, right: 10, bottom: 60, left: 20 }}>
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
            barSize={barSize}
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