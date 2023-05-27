'use client';
import React from 'react';
import ProductItem from './ProductItem';
import Grid from '@mui/material/Grid';
import type { Product } from '@/types/context';

export default function ProductsList({ products }: { products: Product[]}) {
  return (
    <Grid container spacing={4} justifyContent="center">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </Grid>
  );
}
