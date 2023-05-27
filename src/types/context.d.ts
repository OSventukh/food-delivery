import { CartActionType } from '@/provider/cart-enum';

export enum CartActionType {
  AddItem = 'ADD_TO_CART',
  RemoveItem = 'REMOVE_ITEM',
  Increase = 'INCREASE',
  Decrease = 'DECREASE',
  Clear = 'CLEAR',
}

export type Product = {
  id: string;
  name: string;
  price;
};

export type CartContextType = {
  items: Product[];
  totalPrice: number;
  addToCart: (payload: Product) => void;
  increase: (payload: Product) => void;
  decrease: (payload: Product) => void;
  removeFromCart: (payload: Product) => void;
  clearCart: () => void;
};

export type CartAction = {
  type: CartActionType;
  payload?: Product;
};
