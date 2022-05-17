import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { Box, Card, CardHeader, Divider,CardActions,Button,Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart } from '../../chart';
import { Scrollbar } from '../../scrollbar';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import {TimeSeries} from '../../../components/dashboard/customer/timeseries';

export const OverviewTotalTransactions: FC = (props) => {
  const theme = useTheme();

  return (
    <Card {...props}>
      <Scrollbar>
        <Box
          sx={{
            height: 600,
            minWidth: 500,
            px: 2
          }}
        >
          <TimeSeries />
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions>
        <Button endIcon={<ArrowRightIcon fontSize="small" />}>
          詳細はこちら
        </Button>
      </CardActions>

    </Card>
  );
};
