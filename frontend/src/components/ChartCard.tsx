// src/components/ChartCard.tsx
import React from 'react';
import { Card, CardContent, Typography, SxProps, Theme } from '@mui/material';

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>; // ✅ define optional 'sx' prop correctly
};

const ChartCard = ({ title, children, sx }: ChartCardProps) => (
  <Card
    sx={{
      width: '100%',
      borderRadius: '16px',
      p: 2,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(200, 200, 200, 0.2)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      ...sx, // ✅ merge external styles (MUST come last)
    }}
  >
    <CardContent sx={{ p: 2 }}>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 2,
          fontWeight: 600,
          letterSpacing: 0.5,
          color: '#333',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);

export default ChartCard;


// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';

// const ChartCard = ({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <Card
//     sx={{
//       width: '100%',
//       borderRadius: '16px',
//       p: 2,
//       background: 'rgba(255, 255, 255, 0.9)',
//       backdropFilter: 'blur(8px)',
//       border: '1px solid rgba(200, 200, 200, 0.2)',
//       boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//       transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//       '&:hover': {
//         transform: 'scale(1.02)',
//         boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
//       },
//     }}
//   >
//     <CardContent sx={{ p: 2 }}>
//       <Typography
//         variant="subtitle1"
//         sx={{
//           mb: 2,
//           fontWeight: 600,
//           letterSpacing: 0.5,
//           color: '#333',
//           textTransform: 'uppercase',
//         }}
//       >
//         {title}
//       </Typography>
//       {children}
//     </CardContent>
//   </Card>
// );

// export default ChartCard;

