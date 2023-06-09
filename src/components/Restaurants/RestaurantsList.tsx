'use client';
import { useContext, useState } from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { Restaurant } from '@/types/models';
import CartContext from '@/context/cart-context';
import SideMenuContext from '@/context/sidemenu-context';
import theme from '@/theme';

export default function RestaurantsList({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const { restaurant } = useContext(CartContext);
  const { isOpen} = useContext(SideMenuContext)
  return (
    <List
      sx={{
        flexGrow: 1,
        width: '15rem',
        position:  'fixed',
        top: { xs: '3rem', md: '4rem'},
        left: { xs: isOpen ? '0' : '-15em', md: 0 },
        zIndex: '9999',
        height: '100vh',
        transition: 'all 0.5s ease',
        background: theme.palette.primary.main,
      }}
    >
      {restaurants.length === 0 && <div>No restaurants</div>}
      {restaurants.length > 0 &&
        restaurants.map((item, index) => (
          <ListItem
            key={item.id}
            disablePadding
           
          >
            <ListItemButton
              LinkComponent={restaurant && restaurant.id !== item.id ? 'li' : Link}
              disabled={restaurant ? restaurant.id !== item.id : false}
              href={`/${item.id}`}
            >
              <ListItemText sx={{ color: '#c2afaf'}} primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
}
