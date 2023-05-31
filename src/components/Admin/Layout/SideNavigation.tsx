import React from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function SideNavigation() {
  return (
    <List sx={{ height: '100vh', width: '15rem', background: '#263238', pt: '100px' }}>
      <ListItem
        component={Link}
        disablePadding
        href='/admin'
      >
        <ListItemButton>
          <ListItemText primary='Home' />
        </ListItemButton>
      </ListItem>
      <ListItem
        component={Link}
        disablePadding
        href='/admin/new-restaurant'
      >
        <ListItemButton>
          <ListItemText primary='New Restaurant' />
        </ListItemButton>
      </ListItem>
      <ListItem
        component={Link}
        disablePadding
        href='/admin/new-product'
      >
        <ListItemButton>
          <ListItemText primary='New Product' />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
