'use client';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function ManagerOptions() {
  return (
    <Box>
      <Button LinkComponent={Link} href="new-restaurant">
        Add restaurant
      </Button>
      <Button LinkComponent={Link} href="new-product">Add product</Button>
    </Box>
  );
}
