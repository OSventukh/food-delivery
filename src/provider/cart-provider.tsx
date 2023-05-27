'use client';
import { useReducer } from 'react';
import CartContext from '@/context/cart-context';
import { CartActionType } from './cart-enum';
import type {
  Product,
  CartAction,
  CartContextType,
  CartItem,
} from '@/types/context';

const sumItems = (cartItems: CartItem[]) => {
  const totalQuantity = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const totalPrice = +cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { totalQuantity, totalPrice };
};

const cartReducer = (
  state: CartContextType,
  action: CartAction
): CartContextType => {
  switch (action.type) {
    case CartActionType.AddItem:
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // increase quantity of existing item
        const newStateItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          ...sumItems(newStateItems),
          items: newStateItems,
        };
      }
      // add new item to cart
      const newItem: CartItem = { ...action.payload, quantity: 1 };
      const newStateItems = [...state.items, newItem];
      return {
        ...state,
        ...sumItems(newStateItems),
        items: newStateItems,
      };

    default:
      return state;
  }
};

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
