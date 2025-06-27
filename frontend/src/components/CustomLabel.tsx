// endering percentage values directly on top of each bar
const CustomLabel = ({ x, y, width, value, fill }: any) => {
  if (!value || value === '0%') return null;
  const labelX = x + width / 2;
  const labelY = y + 14;
  return (
    <text x={labelX} y={labelY} fill={fill || '#fff'} textAnchor="middle" fontSize={11} fontWeight={600}>
      {value}
    </text>
  );
};

export default CustomLabel;
