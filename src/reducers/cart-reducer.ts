import { CartActionType } from '../provider/cart-enum';

import type { CartAction, CartContextType, CartItem } from '@/types/context';

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

export const cartReducer = (
  state: CartContextType,
  action: CartAction
): CartContextType => {
  switch (action.type) {
    case CartActionType.AddItem: {
      // prevent add product to cart from other restaurant
      if (
        state.restaurant &&
        action.payload.restaurant.id !== state.restaurant.id
      ) {
        return {
          ...state,
        };
      }
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
        restaurant: action.payload.restaurant,
        items: newStateItems,
      };
    }
    case CartActionType.Increase: {
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
    case CartActionType.Decrease: {
      const newStateItems = state.items.map((item) =>
        item.id === action.payload.id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        ...state,
        ...sumItems(newStateItems),
        restaurant: newStateItems.length === 0 ? null : state.restaurant,
        items: newStateItems,
      };
    }

    case CartActionType.RemoveItem: {
      const newStateItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        ...sumItems(newStateItems),
        restaurant: newStateItems.length === 0 ? null : state.restaurant,
        items: newStateItems,
      };
    }

    case CartActionType.Clear: {
      return {
        ...state,
        totalPrice: 0,
        totalQuantity: 0,
        restaurant: null,
        items: [],
      };
    }

    case CartActionType.Init: {
      return action.payload;
    }
    default:
      return state;
  }
};
