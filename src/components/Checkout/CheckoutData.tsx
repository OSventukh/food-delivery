'use client';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import type { CheckoutDataProps } from '@/types/props';

export default function CheckoutData({ onFirstName, onLastName, onEmail, onPhone, onStreet, onHouseNumber }: CheckoutDataProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '2', gap: '1rem', p: '1rem 2rem', width: '100%'}}>
      <TextField onChange={onFirstName} id="first-name" label="First name" variant="filled" size='small' required />
      <TextField onChange={onLastName} id="Last-name" label="Last name" variant="filled" size='small' />
      <TextField onChange={onEmail} id="email" label="Email" variant="filled" size='small' />
      <TextField onChange={onPhone} id="phone" label="Phone" variant="filled" size='small' required />
      <TextField onChange={onStreet} id="street" label="Street" variant="filled" size='small' required />
      <TextField onChange={onHouseNumber} id="house-number" label="House number" variant="filled" size='small' required />
    </Box>
  );
}
