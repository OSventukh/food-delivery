'use client';
import { useReducer } from 'react';
import CartContext from '@/context/cart-context';
import { CartActionType } from './cart-enum';
import { cartReducer } from '@/reducers/cart-reducer';
import type { Product } from '@/types/context';

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    addToCart: () => {},
    increase: () => {},
    decrease: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

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
    totalQuantity: state.totalQuantity,
    addToCart,
    increase,
    decrease,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
