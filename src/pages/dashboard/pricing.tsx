import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Badge, Box, Container, Divider, Grid, Switch, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { gtm } from '../../lib/gtm';

const Pricing: NextPage = () => {
  const theme = useTheme();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Pricing | Material Kit Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          pb: 6
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            py: 6
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              alignItems="center"
              spacing={2}
              flexWrap="nowrap"
            >
              <Grid
                item
                md={7}
                xs={12}
              >
                <Typography variant="h3">
                  Start today. Boost up your services!
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ my: 2 }}
                  variant="body1"
                >
                  Join 3,000+ developers &amp; designers using Devias to
                  power modern web projects.
                </Typography>
                <Switch />
                <Badge
                  badgeContent="25% OFF"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      right: -38,
                      top: '25%'
                    }
                  }}
                >
                  <Typography variant="body1">
                    Yearly Payment
                  </Typography>
                </Badge>
              </Grid>
              <Grid
                item
                md={5}
                sx={{
                  display: {
                    md: 'block',
                    xs: 'none'
                  }
                }}
              >
                <Box
                  sx={{
                    height: 420,
                    maxWidth: 419,
                    position: 'relative',
                    '& img': {
                      height: 'auto',
                      position: 'absolute',
                      top: 0,
                      width: '100%'
                    }
                  }}
                >
                  <img
                    alt="Pricing hero"
                    src={`/static/pricing/pricing_${theme.palette.mode}.svg`}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Divider />
        
        <Typography
          align="center"
          color="textSecondary"
          component="p"
          variant="caption"
        >
          30% of our income goes into Whale Charity
        </Typography>
      </Box>
    </>
  );
};

Pricing.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Pricing;
