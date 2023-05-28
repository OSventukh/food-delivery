export type Address = {
  city: string;
  street: string;
  house: string;
};

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname?: string;
  phone: string;
  address: Address;
  orders: Order[];
};

export type Restaurant = {
  id: string;
  name: string;
  address: Address;
  products: Product[];
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  orderItems: OrderItem[];
  restaurant: Restaurant;
  restaurantId: string;
};

export type OrderItem = {
  id: string;
  product: Product;
  productId: string;
  quantity: number;
  order: Order;
  orderId: string;
};

export type Order = {
  id: string;
  totalPrice: number;
  items: OrderItem[];
  user: User;
  userId: string;
};
