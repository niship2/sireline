import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { gtm } from '../../lib/gtm';

export const BrowseModals: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Browse: Modals | Material Kit Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
        </Container>
      </Box>
    </>
  );
};

BrowseModals.getLayout = (page) => (
  <MainLayout>
    <BrowseLayout>
      {page}
    </BrowseLayout>
  </MainLayout>
);

export default BrowseModals;
