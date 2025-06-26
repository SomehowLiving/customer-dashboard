import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container } from '@mui/material';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import GroupedBarChart from '../components/GroupedBarChart';
// import { StackedBarChart } from '@mui/icons-material';
import StackedBarCard from '../components/StackedBarCard';
import CustomerTable from '../components/CustomerTable';

const Dashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [acvData, setAcvData] = useState([]);

  const BASE_URL = 'https://crispy-fiesta-x5pr4945rp53p95q-3001.app.github.dev';

  useEffect(() => {
    axios.get(`${BASE_URL}/api/customer-type`).then(res => setCustomerData(res.data));
    axios.get(`${BASE_URL}/api/account-industry`).then(res => setIndustryData(res.data));
    axios.get(`${BASE_URL}/api/team`).then(res => setTeamData(res.data));
    axios.get(`${BASE_URL}/api/acv-range`).then(res => setAcvData(res.data));
    axios.get(`${BASE_URL}/api/acv-by-quarter`).then(res => setCustomerData(res.data));
  
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
  {/* Row 1: Customer Type + Industry (2 on one row) */}
  <Grid item xs={12} md={6}>
    <ChartCard title="Customer Type ACV - Quarterly">
      {/* <DonutChart data={customerData} category="customer" /> */}
      <StackedBarCard data={customerData}/>
    </ChartCard>
  </Grid>

  <Grid container spacing={3}>
       <Grid item xs={12} md={6} lg={4}>
           <ChartCard title="Customer Type ACV">
             <DonutChart data={customerData} category="customer" />
           </ChartCard>
         </Grid>

  <Grid item xs={12} md={6}>
    <ChartCard title="Account Industry ACV">
      <BarChart data={industryData} />
    </ChartCard>
  </Grid>

  {/* Row 2: Team ACV (full width for grouped bar to breathe) */}
  <Grid item xs={12}>
    <ChartCard title="Team ACV">
      <GroupedBarChart data={teamData} />
    </ChartCard>
  </Grid>

  {/* Row 3: ACV Range donut (centered if possible) */}
  <Grid item xs={12} md={6} mx="auto">
    <ChartCard title="ACV Range Distribution">
      <DonutChart data={acvData} category="range" />
    </ChartCard>
  </Grid>
  <Grid item xs={12} md={12} lg={12}>
  <ChartCard title="Customer Type Data Table">
    <CustomerTable data={customerData} />
  </ChartCard>
</Grid>

</Grid>

    </Container>
  );
};

export default Dashboard;
