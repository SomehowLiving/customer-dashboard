import React from 'react';
import { formatCurrency } from '../utils/format';

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      {label && <strong>{label}</strong>}
      {payload.map((entry: any, index: number) => (
        <div key={index} style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </div>
      ))}
    </div>
  );
};

export default ChartTooltip;
