'use client';
import { useContext } from 'react';
import CartContext from '@/context/cart-context';
import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import CartItemQuantity from './CartItemQuantity';

export default function CartList() {
  const { items, totalPrice, increase, decrease, removeFromCart } =
    useContext(CartContext);

  return (
    <>
      <List>
        {items.map((item) => (
          <>
            <ListItem key={item.id} sx={{ flexDirection: { xs: 'column', sm: 'row'}  }}>
              <ListItemText primary={item.title} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <CartItemQuantity
                  product={item}
                  increase={increase}
                  decrease={decrease}
                />
                <Typography>{item.quantity * item.price} UAH</Typography>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={removeFromCart.bind(null, item)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        Total: {totalPrice} UAH
      </Box>
    </>
  );
}
