'use client';
import React from 'react';
import ProductItem from './ProductItem';
import Grid from '@mui/material/Grid';
const products = [
  {
    id: '1',
    title: 'Hamburger',
    description: 'Very tasty',
    price: 1.99,
    image:
      'https://s7d1.scene7.com/is/image/mcdonalds/Sdwch_Hamburger:1-4-product-tile-desktop',
  },
  {
    id: '2',
    title: 'Cheeseburger',
    description: 'Very tasty',
    price: 2.99,
    image:
      'https://s7d1.scene7.com/is/image/mcdonalds/Sdwch_Cheeseburger:1-4-product-tile-desktop',
  },
  {
    id: '3',
    title: 'Double Cheeseburger',
    description: 'Very tasty',
    price: 5.99,
    image:
      'https://s7d1.scene7.com/is/image/mcdonalds/SdwchDoubleCheeseburger:1-4-product-tile-desktop',
  },
  {
    id: '4',
    title: 'McChicken',
    description: 'Very tasty',
    price: 6.99,
    image:
      'https://s7d1.scene7.com/is/image/mcdonalds/Sdwch_McChicken:1-4-product-tile-desktop',
  },
];
export default function ProductsList() {
  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </Grid>
  );
}
