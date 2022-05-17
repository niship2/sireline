import type { FC } from 'react';
import { useState, useEffect, useCallback, FormEvent, useRef,SyntheticEvent } from 'react';
import type { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
//import { Box, Card, CardHeader, Divider,CardActions,Button,Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {Chart} from '../../../../src/components/chart'
//import { Chart } from '../../chart';
import { Scrollbar } from '../../../../src/components/scrollbar';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardHeader,
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
import {TimeSeries} from '../../../components/dashboard/customer/timeseries';


const OverviewTotalTransactions: NextPage = (props) => {
 
  return (
    <>
  <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
    <Container maxWidth="xl">
      <Card {...props}>
          <Box
          sx={{
            height: 600,
            //minWidth: 500,
            px: 2
          }}
        >
           <TimeSeries />
          </Box>
      </Card>
    </Container>
  </Box>
    </>
  );
};

OverviewTotalTransactions.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default OverviewTotalTransactions;