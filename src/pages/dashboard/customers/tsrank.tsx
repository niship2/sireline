import { useState, useEffect, useCallback, FormEvent, useRef } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { customerApi } from '../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { CustomerListTable } from '../../../components/dashboard/customer/customer-list-table';
import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Plus as PlusIcon } from '../../../icons/plus';
import { Search as SearchIcon } from '../../../icons/search';
import { Upload as UploadIcon } from '../../../icons/upload';
import { gtm } from '../../../lib/gtm';
import type { Customer } from '../../../types/customer';

interface Filters {
  query?: string;
  hasAcceptedMarketing?: boolean;
  isProspect?: boolean;
  isReturning?: boolean;
}

type SortField = 'updatedAt' | 'totalOrders';

type SortDir = 'asc' | 'desc';

type Sort =
  | 'updatedAt|desc'
  | 'updatedAt|asc'
  | 'totalOrders|desc'
  | 'totalOrders|asc';

interface SortOption {
  label: string;
  value: Sort;
}

type TabValue = 'all' | 'all2' | 'all3' | 'all4' | 'all5';

interface Tab {
  label: string;
  value: TabValue;
}

const tabs: Tab[] = [
  {
    label: '総合ランキング',
    value: 'all'
  },
  {
    label: '産業別ランキング',
    value: 'all2'
  },
  {
    label: '企業規模別ランキング',
    value: 'all3'
  },
  {
    label: '出願年別ランキング',
    value: 'all4'
  },
  {
    label: '技術分野別ランキング',
    value: 'all5'
  }
];

//const descendingComparator = (a: Customer, b: Customer, sortBy: SortField): number => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

//  if (b[sortBy]! < a[sortBy]!) {
//    return -1;
//  }

//  if (b[sortBy]! > a[sortBy]!) {
//    return 1;
//  }

//  return 0;
//};
//#const getComparator = (sortDir: SortDir, sortBy: SortField) => (
//  sortDir === 'desc'
//    ? (a: Customer, b: Customer) => descendingComparator(a, b, sortBy)
//    : (a: Customer, b: Customer) => -descendingComparator(a, b, sortBy)
//);

const applySort = (customers: Customer[], sort: Sort): Customer[] => {
  //const [sortBy, sortDir] = sort.split('|') as [SortField, SortDir];
  //const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  // @ts-ignore
  return stabilizedThis.map((el) => el[0]);
};



const CustomerList: NextPage = () => {
  const isMounted = useMounted();
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentTab, setCurrentTab] = useState<TabValue>('all');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    query: '',
    hasAcceptedMarketing: undefined,
    isProspect: undefined,
    isReturning: undefined
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomers = useCallback(async () => {
    try {
      const data = await customerApi.getCustomers();

      if (isMounted()) {
        setCustomers(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getCustomers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleTabsChange = (event: ChangeEvent<{}>, value: TabValue): void => {
    const updatedFilters: Filters = {
      ...filters,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined
    };

    if (value !== 'all') {
      //updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

//  const handleQueryChange = (event: FormEvent<HTMLFormElement>): void => {
//    event.preventDefault();
//    setFilters((prevState) => ({
//      ...prevState,
//      query: queryRef.current?.value
//    }));
//  };

//  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
//    setSort(event.target.value as Sort);
//  };

//  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
//    setPage(newPage);
//  };

//  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>): void => {
//    setRowsPerPage(parseInt(event.target.value, 10));
//  };

 

  return (
    <>
      <Head>
        <title>
          Dashboard: TS値ランキング
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1
        }}
      >
        <Container maxWidth="xl">
          <Card>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ px:3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Card>
          <Divider />
          <Card>
           
            
          </Card>
        </Container>
      </Box>
    </>
  );
};

CustomerList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerList;