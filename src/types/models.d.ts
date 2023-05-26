export type Address = {
  city: String
  street: String
  house: Int
}

export type User = {
  id: string
  email:string
  firstname: string
  lastname?: string
  phone: string
  address: Address
  orders: Order[]
}

export type Restraunt = {
  name: string;
  address: Address;
}

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  orderItems: OrderItem[]
}

export type OrderItem = {
  id: string;
  product: Product
  productId: string;
  quantity: number;
  order: Order;
  orderId: string;
}

export type Order = {
  id: string;
  totalPrice: number;
  orderItems: OrderItem[]
  user: User;
  userId: string;
}