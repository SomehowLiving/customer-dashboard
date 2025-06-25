import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';

const Dashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [acvData, setAcvData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/customer-type').then(res => setCustomerData(res.data));
    axios.get('http://localhost:3001/api/account-industry').then(res => setIndustryData(res.data));
    axios.get('http://localhost:3001/api/team').then(res => setTeamData(res.data));
    axios.get('http://localhost:3001/api/acv-range').then(res => setAcvData(res.data));
  }, []);

  return (
    <Grid container spacing={3}>
      <ChartCard title="Customer Type ACV">
        <BarChart data={customerData} />
        <DonutChart data={customerData} category='customer'/>
      </ChartCard>

      <ChartCard title="Account Industry ACV">
        {/* <BarChart data={industryData} /> */}
        <BarChart data={industryData} keys={['Manufacturing', 'Transportation']} />
      </ChartCard>

      <ChartCard title="Team ACV">
        <BarChart data={teamData} />
      </ChartCard>

      <ChartCard title="ACV Range Distribution">
        <DonutChart data={acvData} category='range' />
      </ChartCard>
    </Grid>
  );
};

export default Dashboard;
