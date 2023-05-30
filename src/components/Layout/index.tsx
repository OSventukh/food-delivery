'use client';

import { useContext } from 'react';
import NotificationContext from '@/context/notification-context';
import NavigationBar from './NavigationBar';
import Snack from '../UI/SnackBar';

export default function Layout({ session, children }: { session: any, children: React.ReactNode }) {
  const {notification} = useContext(NotificationContext);
  return (
    <>
      <NavigationBar session={session} />
      <main>
        {children}
      </main>
      <Snack show={notification.show} text={notification.message} type={notification.type} />
    </>
  );
}
