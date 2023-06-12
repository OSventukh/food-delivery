'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { Restaurant } from '@/types/models';
import CartContext from '@/context/cart-context';
import SideMenuContext from '@/context/sidemenu-context';
import MenuList from '../UI/Menu';
import theme from '@/theme';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

export default function RestaurantsList({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const { restaurant } = useContext(CartContext);
  const { isOpen } = useContext(SideMenuContext);
  const { data: session } = useSession();



  const restaurantDeleteHandler = async (id: string) => {
    console.log(id);
  }


  return (
    <List
      sx={{
        flexGrow: 1,
        width: '15rem',
        position: 'fixed',
        top: { xs: '3rem', md: '4rem' },
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
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              LinkComponent={
                restaurant && restaurant.id !== item.id ? 'li' : Link
              }
              disabled={restaurant ? restaurant.id !== item.id : false}
              href={`/${item.id}`}
            >
              <ListItemText sx={{ color: '#c2afaf' }} primary={item.name} />
            </ListItemButton>
            {session && session.user.role === Role.MANAGER && (
              <MenuList id={item.id} onDelete={restaurantDeleteHandler} />
            )}
          </ListItem>
        ))}
    </List>
  );
}
