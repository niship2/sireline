import type { FC } from 'react';
import { useState, useEffect, useCallback, FormEvent, useRef,SyntheticEvent } from 'react';
import type { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
//import { Box, Card, CardHeader, Divider,CardActions,Button,Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {Chart} from '../../../../src/components/chart'
import { Scrollbar } from '../../../../src/components/scrollbar';
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


//const TimeSeries = () =>{
export function TimeSeries(){
    const theme = useTheme();
    const [catvalary,setCatvalary] = useState(['2022年1月','2022年2月',  '2022年3月',  '2022年4月', '2022年5月','2022年6月',  '2022年7月',  '2022年8月',  '2022年9月',  '2022年10月',  '2022年11月','2022年12月']);
    const [xvalary,setXvalary] = useState([1, 2, 3, 4, 5, 6, 7,8,9, 10, 11, 12]);
    const [yvalary,setYvalary] = useState([1, 2, 3, 4, 5, 6, 7,8,9, 10, 11, 12]);
    
    useEffect(() => {
      let url_appl = "https://get-timeseries-tsval-byrunjg3yq-uc.a.run.app";
      fetch(url_appl)
      .then(result => result.json())
          //.then(rowData => setData2(rowData))
      .then((rowData)=>{
        const categories = rowData.map((obj:any) => obj.yyyymm)
        const xvals = rowData.map((obj:any) => obj.cumulative_appcount)
        const yvals = rowData.map((obj:any) => obj.cumulative_tsval)
  
        setCatvalary(categories)
        setXvalary(xvals)
        setYvalary(yvals)
      })
    }, []);
  
    const chartdata = {
      series: [
        { name:"公開件数",data: xvalary},
        { name:"TS値合計",data: yvalary }
      ],
      categories: catvalary
    };
    
  
  
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
        categories: chartdata.categories,
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
  
    const chartSeries = chartdata.series;
  
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
      <Card>
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


}

//export default TimeSeries
