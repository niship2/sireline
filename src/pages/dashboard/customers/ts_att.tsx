import { useState, useEffect, useCallback, FormEvent, useRef,SyntheticEvent } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { gtm } from '../../../lib/gtm';
import {CarsGrid} from '../../../components/dashboard/customer/aggrid'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




const CustomerList: NextPage = () => {

  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <>
      <Head>
        <title>
          TS値ランキング
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="総合ランキング" {...a11yProps(0)} />
          <Tab label="業界別ランキング" {...a11yProps(1)} />
          <Tab label="技術別ランキング" {...a11yProps(2)} />
          <Tab label="企業規模別ランキング" {...a11yProps(3)} />
          <Tab label="" {...a11yProps(3)} />          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CarsGrid />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CarsGrid />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CarsGrid />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CarsGrid />
      </TabPanel>      
    </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerList;
