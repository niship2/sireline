import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import type { FC } from 'react';
import { Box} from '@mui/material';
import type { Product } from '../../../types/product';
import dynamic from 'next/dynamic'

export const Comp3 = dynamic(
  () => import('../../amcharts/amctest'),
  { ssr: false }
)


export const ProductListTable: FC = (props) => {
 
  return (
    <div>
      
        <Box>
          <Comp3 />  
        </Box>
      
    </div>
  );
};