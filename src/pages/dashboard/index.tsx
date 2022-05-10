import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { OverviewBanner } from '../../components/dashboard/overview/overview-banner';
import { OverviewTSRank } from '../../components/dashboard/overview/overview-ts-rank';
import { OverviewInbox } from '../../components/dashboard/overview/overview-att-inventor';
import { OverviewAttComp } from '../../components/dashboard/overview/overview-att-comp';
import { OverviewCompreport } from '../../components/dashboard/overview/overview-compreport';
import { OverviewRisk } from '../../components/dashboard/overview/overview-risk';
import { OverviewTotalTransactions } from '../../components/dashboard/overview/overview-timeseries';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { Briefcase as BriefcaseIcon } from '../../icons/briefcase';
import { Download as DownloadIcon } from '../../icons/download';
import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from '../../icons/information-circle-outlined';
import { Reports as ReportsIcon } from '../../icons/reports';
import { Users as UsersIcon } from '../../icons/users';
import { gtm } from '../../lib/gtm';

const Overview: NextPage = () => {
  const [displayBanner, setDisplayBanner] = useState<boolean>(true);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner');

    if (value === 'true') {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>
          Dashboard: Overview | Techsize
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
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  OVERVIEW
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  m: -1
                }}
              >
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
            {displayBanner && (
              <Grid
                item
                xs={12}
              >
                <OverviewBanner onDismiss={handleDismissBanner} />
              </Grid>
            )}
            <Grid
              item
              md={6}
              xs={12}
            >
              <OverviewTSRank />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <OverviewCompreport />
            </Grid>
            <Grid
            item
            md={6}
            xs ={12}
            >
              <OverviewRisk />
            </Grid>            
            <Grid
              item
              md={12}
              xs={12}
            >

              <OverviewTotalTransactions />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <OverviewAttComp />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <OverviewInbox />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <BriefcaseIcon
                      color="primary"
                      fontSize="small"
                    />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      個別レポートについて
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2 }}
                  >
                    個別レポートを提供いたします
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                  >
                    ご相談はこちら
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <InformationCircleOutlinedIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      Help Center
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h6"
                  >
                   ダッシュボードの使い方でお困りですか
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<ExternalLinkIcon fontSize="small" />}
                    size="small"
                  >
                    ダッシュボードの利用マニュアルはこちら
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <DownloadIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      Download
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h6"
                  >
                    企業レポートのダウンロードはこちら
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    毎週発行の企業レポートがダウンロードできます
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<DownloadIcon fontSize="small" />}
                    size="small"
                    variant="outlined"
                  >
                    Download Free Report
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <UsersIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      詳細分析について
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h6"
                  >
                    詳細分析を実施いたします。
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    個別の分析案件も対応可能です
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                    variant="outlined"
                  >
                    詳細はこちら
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Overview;
