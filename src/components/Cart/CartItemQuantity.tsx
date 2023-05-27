import React from 'react';
import { IconButton, Box, Chip } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import type { CartItemQuantityProps } from '@/types/props';


export default function CartItemQuantity({ product, increase, decrease }: CartItemQuantityProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <IconButton size="small" onClick={decrease.bind(null, product)}><RemoveIcon /></IconButton>
      <Chip label={product.quantity} variant="outlined" />
      <IconButton size="small" onClick={increase.bind(null, product)}><AddIcon /></IconButton>
    </Box>
  );
}
