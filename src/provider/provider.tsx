import CartProvider from './cart-provider';
import NotificationProvider from './notification-provider';
import SideMenuContextProvider from './sidemenu-provider';
import AuthProvider from './auth-provider';

export default function ContexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <SideMenuContextProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </SideMenuContextProvider>
      </CartProvider>
    </AuthProvider>
  );
}
