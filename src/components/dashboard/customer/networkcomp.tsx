import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import type { FC } from 'react';
import { Box} from '@mui/material';
import type { Product } from '../../../types/product';
import dynamic from 'next/dynamic'

export const NetworkChart = dynamic(
    () => import('../../amcharts/network'),
    { ssr: false }
  )



export const NetworkComp: FC = (props) => {
 
  return (
    <div>
        <Box>
          <NetworkChart comp1={"キヤノン株式会社"} comp2={"株式会社リコー"} height={1000} />
        </Box>
      
    </div>
  );
};