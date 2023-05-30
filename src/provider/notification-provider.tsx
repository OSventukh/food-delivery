'use client';
import { useState, useCallback, useMemo } from 'react';
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

  const setError = (message: string) => {
    setNotification({
      show: true,
      message,
      type: 'error',
    });
  };

  const setSuccess = (message: string) => {
    setNotification({
      show: true,
      message,
      type: 'success',
    });
  };

  const setWarning = (message: string) => {
    setNotification({
      show: true,
      message,
      type: 'warning',
    });
  };

  const setInfo = (message: string) => {
    setNotification({
      show: true,
      message,
      type: 'info',
    });
  };

  const clearNotification = () => {
    setNotification({
      show: false,
      message: '',
      type: 'success',
    });
  };

  const value = useMemo(
    () => ({
      notification,
      setSuccess,
      setError,
      setWarning,
      setInfo,
      clearNotification,
    }),
    [notification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
