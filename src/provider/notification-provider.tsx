'use client';
import { useState } from 'react';
import NotificationContext from '@/context/notification-context';
import type { Notification } from '@/types/context';
export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<Notification>({
    show: false,
    message: '',
    type: 'success',
  });

  const value = {
    notification,
    setNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
