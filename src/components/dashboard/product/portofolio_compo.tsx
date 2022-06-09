import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import type { FC } from 'react';
import { Box} from '@mui/material';
import type { Product } from '../../../types/product';
import dynamic from 'next/dynamic'
//import {PortofolioChart } from '../../amcharts/portofolioComponent'

export const PortofolioChart = dynamic(
    () => import('../../amcharts/scatter'),
    { ssr: false }
  )



export const Portfoliotable: FC = (props) => {
 
  return (
    <div>
        <Box>
          <PortofolioChart appl1={"キヤノン株式会社"} height={600} />
        </Box>
      
    </div>
  );
};