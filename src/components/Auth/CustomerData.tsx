'use client';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import type { CustomerDataProps } from '@/types/props';

export default function CustomerData({ onFirstName, onLastName, onEmail, onPhone, onPassword, onStreet, onHouseNumber, withPassword = false }: CustomerDataProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', p: '1rem 2rem', width: '100%'}}>
      <TextField onChange={onFirstName} autoComplete='given-name' id="first-name" label="First name" variant="filled" size='small' required />
      <TextField onChange={onLastName} id="Last-name" autoComplete='family-name' label="Last name" variant="filled" size='small' />
      <TextField onChange={onEmail} autoComplete='email' id="email" label="Email" variant="filled" size='small' />
      <TextField onChange={onPhone} autoComplete='tel' id="phone" label="Phone" variant="filled" size='small' required />
      {withPassword && <TextField onChange={onPassword} autoComplete='new-password' type='password' id="password" label="Password" variant="filled" size='small' required />}
      <TextField onChange={onStreet} autoComplete='address-line1' id="street" label="Street" variant="filled" size='small' required />
      <TextField onChange={onHouseNumber} autoComplete='address-line2' id="house-number" label="House number" variant="filled" size='small' required />
    </Box>
  );
}
