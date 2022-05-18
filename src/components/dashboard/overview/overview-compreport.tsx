import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import { Avatar, Box, Button, Card, CardActions, Divider, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { Chart } from '../../chart';


import dynamic from 'next/dynamic'
export const Comp1vis = dynamic(
  () => import('../../amcharts/amctest'),
  { ssr: false }
)

export const OverviewCompreport: FC = (props) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.secondary.light],
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
          background: theme.palette.secondary.dark
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    }
  };


  const com1 = "トヨタ自動車株式会社";
  const com2 = "本田技研工業株式会社";


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
              color="secondary"
              variant="h4"
            >
              注目2社の比較
            </Typography>
            <Comp1vis comp1={com1} comp2={com2} height={400} />
            <Typography
              color="textSecondary"
              sx={{ mt: 1 }}
              variant="body2"
            >
              注目企業の {com1} と  {com2} を比較しました・・・
            </Typography>
          </Box>

        </Box>
      </Box>
      <Divider />
      <CardActions>
        <Button endIcon={<ArrowRightIcon fontSize="small" />}>
          詳細はこちら
        </Button>
      </CardActions>
    </Card>
  );
};
