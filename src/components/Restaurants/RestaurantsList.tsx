'use client';
import { useContext } from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { Restaurant } from '@/types/models';
import CartContext from '@/context/cart-context';
export default function RestaurantsList({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const { restaurant } = useContext(CartContext)
  return (
      <List sx={{ flexGrow: 1, width: '10rem' }}>
        {restaurants.length === 0 && <div>No restaurants</div>}
        {restaurants.length > 0 &&
          restaurants.map((item, index) => (
            <ListItem key={item.id} component={restaurant !== item.id ? 'li' : Link} disablePadding href={`/${item.id}`}>
              <ListItemButton disabled={restaurant !== item.id}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
  );
}
