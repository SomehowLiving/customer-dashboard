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
  LabelList,
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

const GroupedBarChart = ({ data, keys }: Props) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Detect keys from one of the grouped sections if not passed
  const detectedKeys =
    keys ||
    Object.keys(data[0]?.teams || data[0]?.industries || data[0]?.ranges || {}).slice(0, 6);

  const flattenedData = formatChartData(data, {
    sectionKey: 'teams',
    mode: 'grouped',
    keys: detectedKeys,
  });

  return (
    <ResponsiveContainer width="100%" height={420}>
      <ReBarChart data={flattenedData} margin={{ top: 60, right: 30, bottom: 40, left: 20 }}>
        <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
        <XAxis dataKey="quarter" />
        <YAxis tickFormatter={formatCurrency} />
        <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
        <Legend />
        {detectedKeys.map((key, idx) => (
          <Bar
            key={key}
            dataKey={key}
            fill={COLORS[idx % COLORS.length]}
            barSize={36}
          >
            <LabelList dataKey={`${key}_pct`} content={(props) => <CustomLabel {...props} fill="#fff" />} />
          </Bar>
        ))}

      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default GroupedBarChart;
