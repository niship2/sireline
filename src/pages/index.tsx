import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { MainLayout } from '../components/main-layout';
import { HomeHero } from '../components/home/home-hero';
import { gtm } from '../lib/gtm';
import { useAuth } from '../hooks/use-auth';

const Home: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Techsize Pro
        </title>
      </Head>
      <main>
        <HomeHero />
      </main>
    </>
  );
};

Home.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default Home;
