'use client';

import { useState } from 'react';
import NavigationBar from './NavigationBar';
import SideNavigation from './Drawer';
import Container from '@mui/material/Container';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(isOpen);
    };

  return (
    <>
      <NavigationBar openSideNavigation={toggleDrawer} />
      <SideNavigation open={open} toggleDrawer={toggleDrawer} />
      <Container>{children}</Container>
    </>
  );
}
