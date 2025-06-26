import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
// import { NoEncryption } from '@mui/icons-material';

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => 
  (
  <Card
    sx={{
      width: "100%",
      borderRadius: 4,
      p: 2,
      backdropFilter: 'blur(6px)',
      background: 'rgba(255, 255, 255, 0.75)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
      },
      '&:focus, &:focus-within': {
        outline: 'none',
        boxShadow: 'none',
      },
    }}
  >
    <CardContent>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);

export default ChartCard;
