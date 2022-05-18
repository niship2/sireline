import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import type { FC } from 'react';
import { Box} from '@mui/material';
import type { Product } from '../../../types/product';
import dynamic from 'next/dynamic'

export const Comp1vis = dynamic(
  () => import('../../amcharts/amctest'),
  { ssr: false }
)


export const ProductListTable: FC = (props) => {
 
  return (
    <div>
      
        <Box>
          <Comp1vis comp1={"トヨタ自動車株式会社"} comp2={"本田技研工業株式会社"}  height={800}/>  
        </Box>
      
    </div>
  );
};