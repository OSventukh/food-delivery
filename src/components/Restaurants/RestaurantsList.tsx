'use client';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { Restaurant } from '@/types/models';
export default function RestaurantsList({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  return (
      <List sx={{ flexGrow: 1, width: '10rem' }}>
        {restaurants.length === 0 && <div>No restaurants</div>}
        {restaurants.length > 0 &&
          restaurants.map((item, index) => (
            <ListItem key={item.id} component={Link} disablePadding href={`/${item.id}`}>
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
  );
}
