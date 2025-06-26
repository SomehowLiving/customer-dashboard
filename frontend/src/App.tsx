import React from 'react';
import Dashboard from './pages/Dashboard';
import { CssBaseline, Container, Typography } from '@mui/material';
import './App.css'
function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h6" align="center">
          Won ACV mix by Cust Type
        </Typography>
        <Dashboard />
      </Container>
    </>
  );
}

export default App;
