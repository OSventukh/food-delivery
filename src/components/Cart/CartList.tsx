'use client';
import { useContext } from 'react';
import CartContext from '@/context/cart-context';
import { List, ListItem, IconButton, ListItemText, Paper, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

export default function CartList() {
  const { items, totalPrice } = useContext(CartContext);

  return (
    <Paper sx={{ p: '1rem 2rem' }}>
      <List>
        {items.map((item) => (
          <>
            <ListItem
              key={item.id}
              secondaryAction={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem'}}>
                  <Typography>{item.quantity} pc</Typography>
                  <Typography>{+item.quantity * +item.price} UAH</Typography>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                </Box>
              }
            >
              <ListItemText primary={item.title} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Paper>
  );
}
