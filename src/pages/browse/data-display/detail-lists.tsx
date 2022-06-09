import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { BrowseLayout } from '../../../components/browse-layout';
import { MainLayout } from '../../../components/main-layout';
import { WidgetPreviewer } from '../../../components/widget-previewer';
//import { DetailList1 } from '../../../components/widgets/detail-lists/detail-list-1';
//import { DetailList2 } from '../../../components/widgets/detail-lists/detail-list-2';
//import { DetailList3 } from '../../../components/widgets/detail-lists/detail-list-3';
//import { DetailList4 } from '../../../components/widgets/detail-lists/detail-list-4';
//import { DetailList5 } from '../../../components/widgets/detail-lists/detail-list-5';
//import { DetailList6 } from '../../../components/widgets/detail-lists/detail-list-6';
//import { DetailList7 } from '../../../components/widgets/detail-lists/detail-list-7';
//import { DetailList8 } from '../../../components/widgets/detail-lists/detail-list-8';
import { gtm } from '../../../lib/gtm';

const BrowseDetailLists: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Browse: Detail Lists | Material Kit Pro
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

BrowseDetailLists.getLayout = (page) => (
  <MainLayout>
    <BrowseLayout>
      {page}
    </BrowseLayout>
  </MainLayout>
);

export default BrowseDetailLists;
