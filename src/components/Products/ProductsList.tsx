'use client';
import React from 'react';
import ProductItem from './ProductItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import type { Product } from '@/types/context';

export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <Box sx={{ ml: {sm: 0, md: '15rem'}, mt: '5rem'}}>
      <Grid container spacing={4} justifyContent="center">
        {products.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </Grid>
    </Box>
  );
}
