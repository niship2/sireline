import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import type { FC } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../../icons/chevron-right';
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal';
import { Image as ImageIcon } from '../../../icons/image';
import type { Product } from '../../../types/product';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';
import dynamic from 'next/dynamic'

export const Comp3 = dynamic(
  () => import('../../amcharts/amctest'),
  { ssr: false }
)


interface ProductListTableProps {
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  products: Product[];
  productsCount: number;
  rowsPerPage: number;
}


export const ProductListTable: FC<ProductListTableProps> = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    products,
    productsCount,
    rowsPerPage,
    ...other
  } = props;
  const [openProduct, setOpenProduct] = useState<string | null>(null);

  const handleOpenProduct = (productId: string): void => {
    setOpenProduct((prevValue) => (prevValue === productId ? null : productId));
  };

  const handleUpdateProduct = (): void => {
    setOpenProduct(null);
    toast.success('Product updated');
  };

  const handleCancelEdit = (): void => {
    setOpenProduct(null);
  };

  const handleDeleteProduct = (): void => {
    toast.error('Product cannot be deleted');
  };



  return (
    <div>
      
        <Box>
          <Comp3 />  
        </Box>
      
    </div>
  );
};