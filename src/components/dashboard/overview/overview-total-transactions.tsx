import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { Box, Card, CardHeader, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart } from '../../chart';
import { Scrollbar } from '../../scrollbar';
import dynamic from 'next/dynamic'


//ssrさせない呪文。その結果を使う

export const Comp3 = dynamic(
  () => import('../../amcharts/amctest'),
  { ssr: false }
)

const data = {
  series: [
    { name:"出願件数",data: [12000, 24777, 36000, 41000, 60000, 65000, 84000] },
    { name:"TS値合計",data: [11112, 24444, 39000, 48000, 60000, 66000, 84000] }
  ],
  categories: [
    '2022年1月',
    '2022年2月',
    '2022年3月',
    '2022年4月',
    '2022年5月',
    '2022年6月',
    '2022年7月'
  ]
};

export const OverviewTotalTransactions: FC = (props) => {
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
    <Card {...props}>
      <CardHeader
        subheader={format(new Date(), 'MMM yyyy')}
        title="TS値時系列変化"
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
      <Box>
        <Comp3 />  

      </Box>
    </Card>
  );
};
