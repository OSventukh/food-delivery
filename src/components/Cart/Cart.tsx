'use client'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CartList from './CartList';
import Link from 'next/link';
Link
export default function Cart() {
  return (
    <Paper sx={{ p: '1rem 2rem' }}>
      <CartList />
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: '1rem'}}>
        <Button variant='contained' color="success" LinkComponent={Link} href='/checkout'>Submit</Button>
      </Box>
    </Paper>
  )
}
