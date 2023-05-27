import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import type { SideNavigationProps } from '@/types/props';
import RestrauntsList from '../Restraunts/RestrauntsList';



export default function SideNavigation({open, toggleDrawer }: SideNavigationProps) {


  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <RestrauntsList />
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}
