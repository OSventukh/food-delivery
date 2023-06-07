import CartProvider from './cart-provider';
import NotificationProvider from './notification-provider';
import SideMenuContextProvider from './sidemenu-provider';

export default function ContexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <SideMenuContextProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </SideMenuContextProvider>
    </CartProvider>
  );
}
