'use client';
import { useReducer, useEffect } from 'react';
import CartContext from '@/context/cart-context';
import { CartActionType } from './cart-enum';
import { cartReducer } from '@/reducers/cart-reducer';
import type { Product, CartContextType } from '@/types/context';

let initialState = {
  items: [],
  totalPrice: 0,
  restaurant: '',
  totalQuantity: 0,
  addToCart: () => {},
  increase: () => {},
  decrease: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      initState(JSON.parse(cartData))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const initState = (payload: CartContextType) => {
    dispatch({ type: CartActionType.Init, payload });
  };

  const addToCart = (payload: Product) => {
    dispatch({ type: CartActionType.AddItem, payload });
  };

  const increase = (payload: Product) => {
    dispatch({ type: CartActionType.Increase, payload });
  };

  const decrease = (payload: Product) => {
    dispatch({ type: CartActionType.Decrease, payload });
  };

  const removeFromCart = (payload: Product) => {
    dispatch({ type: CartActionType.RemoveItem, payload });
  };

  const clearCart = () => {
    dispatch({ type: CartActionType.Clear });
  };

  const value = {
    items: state.items,
    totalPrice: state.totalPrice,
    restaurant: state.restaurant,
    totalQuantity: state.totalQuantity,
    addToCart,
    increase,
    decrease,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
