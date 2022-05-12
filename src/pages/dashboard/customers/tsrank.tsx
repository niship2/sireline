import type { FC } from 'react';
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



const data = {
  series: [
    { name:"出願件数",data: [12000, 24777, 36000, 41000, 60000, 65000, 84000,12000, 24777, 36000, 41000, 60000, 65000, 84000] },
    { name:"TS値合計",data: [11112, 24444, 39000, 48000, 60000, 66000, 84000,11112, 24444, 39000, 48000, 60000, 66000, 84000] }
  ],
  categories: [
    '2022年1月',
    '2022年2月',
    '2022年3月',
    '2022年4月',
    '2022年5月',
    '2022年6月',
    '2022年7月',
    '2022年8月',
    '2022年9月',
    '2022年10月',
    '2022年11月',
    '2022年12月',                
  ]
};

const OverviewTotalTransactions: NextPage = (props) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: true
      }
    },
    colors: ['#6E7AD8', '#4655CE', '#2F3EB1'],
    dataLabels: {
      enabled: true
    },
    fill: {
      opacity: 1
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    legend: {
      show: false
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: data.categories,
      labels: {
        style: {
          colors: '#A3A3A3'
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -12,
        style: {
          colors: '#A3A3A3'
        }
      }
    }
  };

  const chartSeries = data.series;

  return (
    <>
    <Head>
    <title>
      TS値時系列
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
    <Card {...props}>
        <Typography
              color="primary"
              variant="h4"
            >
              TS値時系列変化
        </Typography>
      <CardHeader
        subheader={format(new Date(), 'MMM yyyy')}
        
      />
      <Divider />
      <Scrollbar>
        <Box
          sx={{
            height: 336,
            minWidth: 500,
            px: 2
          }}
        >
          <Chart
            height={300}
            options={chartOptions}
            series={chartSeries}
            type="bar"
          />
        </Box>
      </Scrollbar>
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