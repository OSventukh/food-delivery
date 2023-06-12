'use client';
import { useContext } from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { Restaurant } from '@/types/models';
import CartContext from '@/context/cart-context';
import NotificationContext from '@/context/notification-context';
import SideMenuContext from '@/context/sidemenu-context';
import MenuList from '../UI/Menu';
import theme from '@/theme';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';
import { requestData } from '@/utils/fetch';

export default function RestaurantsList({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const { restaurant } = useContext(CartContext);
  const { isOpen } = useContext(SideMenuContext);
  const { setError, setSuccess } = useContext(NotificationContext);

  const { data: session } = useSession();

  const restaurantDeleteHandler = async (id: string) => {
    try {
      const response = await requestData(`/api/restaurants?id=${id}`, {
        method: 'DELETE',
      });
      setSuccess(response?.message || 'Restaurant was succesfully deleted');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <List
      sx={{
        flexGrow: 1,
        width: '15rem',
        position: 'fixed',
        top: { xs: '3rem', md: '4rem' },
        left: { xs: isOpen ? '0' : '-15em', md: 0 },
        zIndex: '1101',
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
                restaurant && restaurant.id !== item.id ? 'span' : Link
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
