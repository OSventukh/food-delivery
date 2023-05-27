import { createContext } from 'react';
import type { CartContextType } from '@/types/context';

const CartContext = createContext<CartContextType>({
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  addToCart: () => {},
  increase: () => {},
  decrease: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default CartContext;