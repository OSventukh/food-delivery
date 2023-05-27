'use client';

import { useState } from 'react';
import NavigationBar from './NavigationBar';
import Container from '@mui/material/Container';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavigationBar />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
