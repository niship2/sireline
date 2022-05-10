import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import { Avatar, Box, Button, Card, CardActions, Divider, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { ChevronUp as ChevronUpIcon } from '../../../icons/chevron-up';
import { Chart } from '../../chart';
import Link from 'next/link'

export const OverviewRisk: FC = (props) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.light],
    fill: {
      opacity: 1
    },
    labels: [],
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false
        },
        hollow: {
          size: '40%'
        },
        track: {
          background: theme.palette.primary.dark
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [76];

  return (
    <Card {...props}>
      <Box
        sx={{
          alignItems: {
            sm: 'center'
          },
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          }
        }}
      >
        <Chart
          height={160}
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          width={160}
        />
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            pt: {
              sm: 3
            },
            pb: 3,
            pr: 4,
            pl: {
              xs: 4,
              sm: 0
            }
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              mr: 3
            }}
          >
            <Typography
              color="primary"
              variant="h4"
            >
              知財力＊与信力分析
            </Typography>
            <Typography
              color="textSecondary"
              sx={{ mt: 1 }}
              variant="body2"
            >
              知財力と与信力が共に高い企業は・・・
            </Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: alpha(theme.palette.success.main, 0.08),
              color: 'success.main'
            }}
            variant="rounded"
          >
            <ChevronUpIcon fontSize="small" />
          </Avatar>
        </Box>
      </Box>
      <Divider />
      <CardActions>
        <Link href="/dashboard/customers" passHref>
          <Button endIcon={<ArrowRightIcon fontSize="small" />}>
          詳細はこちら
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
