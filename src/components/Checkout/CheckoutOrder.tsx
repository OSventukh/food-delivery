import { useContext } from 'react';
import CartContext from '@/context/cart-context';

import Box from '@mui/material/Box';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function CheckoutOrder() {
  const { items, totalPrice } = useContext(CartContext);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        gap: '1rem',
        p: '1rem 2rem',
      }}
    >
      <List>
        {items.map((item) => (
          <ListItem disableGutters key={item.id}>
            <ListItemText primary={item.title} />
            <Typography>{item.quantity}</Typography>
          </ListItem>
        ))}
      </List>
      <Typography>Total: {totalPrice} UAH</Typography>
    </Box>
  );
}
