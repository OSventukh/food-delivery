import { CartActionType } from '@/provider/cart-enum';
import { Restaurant, User } from './models';
import { NotificationType } from './props';
import { Dispatch } from 'react';

export enum CartActionType {
  AddItem = 'ADD_TO_CART',
  RemoveItem = 'REMOVE_ITEM',
  Increase = 'INCREASE',
  Decrease = 'DECREASE',
  Clear = 'CLEAR',
}

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

export type LoggedUser = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: {
    street: string;
    house: string;
  }
}
export type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  restaurant: Restaurant | null;
  totalPrice: number;
  totalQuantity: number;
  addToCart: (payload: Product) => void;
  increase: (payload: Product) => void;
  decrease: (payload: Product) => void;
  removeFromCart: (payload: Product) => void;
  clearCart: () => void;
};

export type Notification = {
  show: boolean;
  message: string;
  type: NotificationType
}

export type NotificationContext = {
  notification: Notification;
  setSuccess: (message: string) => void;
  setError: (message: string) => void;
  setWarning: (message: string) => void;
  setInfo: (message: string) => void;
  clearNotification: () => void;
}

export type AddItemAction = {
  type: CartActionType.AddItem;
  payload: Product;
};

export type RemoveItemAction = {
  type: CartActionType.RemoveItem;
  payload: Product;
};

export type IncreaseAction = {
  type: CartActionType.Increase;
  payload: Product;
};

export type DecreaseAction = {
  type: CartActionType.Decrease;
  payload: Product;
};

export type ClearAction = {
  type: CartActionType.Clear;
};

export type InitAction = {
  type: CartActionType.Init;
  payload: CartContextType;
};

export type CartAction =
  | AddItemAction
  | RemoveItemAction
  | IncreaseAction
  | DecreaseAction
  | CartAction
  | InitAction;
