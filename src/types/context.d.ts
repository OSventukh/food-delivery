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
  title: string;
  description: string;
  price: number;
  image: string;
};


export type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  restaurant: string;
  totalPrice: number;
  totalQuantity: number;
  addToCart: (payload: Product) => void;
  increase: (payload: Product) => void;
  decrease: (payload: Product) => void;
  removeFromCart: (payload: Product) => void;
  clearCart: () => void;
};

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
