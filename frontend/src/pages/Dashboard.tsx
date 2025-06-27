import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container } from '@mui/material';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import GroupedBarChart from '../components/GroupedBarChart';
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
      <Grid container spacing={3} alignItems="stretch">

        {/* Row 1: Stacked Bar (Big) + Donut (Small) */}
        <Grid item xs={12} md={8}>
          <ChartCard title="Customer Type ACV - Quarterly">
            <StackedBarCard data={customerData} />
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartCard title="Customer Type Breakdown">
            <DonutChart data={customerData} category="customer" />
          </ChartCard>
        </Grid>

        {/* Row 2: Industry + ACV Range  */}
        <Grid item xs={12} md={4}  >
          <ChartCard title="ACV Range Distribution" sx={{ height: '100%' }}>
            <DonutChart data={acvData} category="range" />
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <ChartCard title="Account Industry ACV">
            <BarChart data={industryData} />
          </ChartCard>
        </Grid>

        {/* Row 3: Team ACV Performance (Full width) */}
        <Grid item xs={12}>
          <ChartCard title="Team ACV Performance">
            <GroupedBarChart data={teamData} />
          </ChartCard>
        </Grid>

        {/* Row 4: Customer Type Table */}
        <Grid item xs={12}>
          <ChartCard title="Customer Type Data Table">
            <CustomerTable data={customerData} />
          </ChartCard>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Dashboard;
