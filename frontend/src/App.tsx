import React from 'react';
import Dashboard from './pages/Dashboard';
import { CssBaseline, Container, Typography } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Data Insights Dashboard
        </Typography>
        <Dashboard />
      </Container>
    </>
  );
}

export default App;
