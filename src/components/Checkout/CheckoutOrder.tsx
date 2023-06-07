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
        width: '100%',
      }}
    >
      <Typography variant='h5' sx={{ textAlign: 'center' }}>Order</Typography>
      <List>
        {items.map((item) => (
          <ListItem disableGutters key={item.id} sx={{ width: '80%'}}>
            <ListItemText primary={item.title} />
            <Typography>{item.quantity}</Typography>
          </ListItem>
        ))}
      </List>
      <Typography>Total price: {totalPrice} UAH</Typography>
    </Box>
  );
}
