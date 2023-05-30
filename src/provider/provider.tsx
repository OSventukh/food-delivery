import CartProvider from './cart-provider';
import NotificationProvider from './notification-provider';

export default function ContexProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </CartProvider>
  );
}
