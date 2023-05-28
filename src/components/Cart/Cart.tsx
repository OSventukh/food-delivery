'use client'
import {useContext} from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CartList from './CartList';
import Link from 'next/link';
import CartContext from '@/context/cart-context';

export default function Cart() {
  const { items } = useContext(CartContext);
  return (
    <Paper sx={{ p: '1rem 2rem' }}>
      <CartList />
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: '1rem'}}>
        <Button variant='contained' disabled={items.length === 0} color="success" LinkComponent={Link} href='/checkout'>Submit</Button>
      </Box>
    </Paper>
  )
}
