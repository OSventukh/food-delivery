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

  const setError = useCallback((message: string) => {
    setNotification({
      show: true,
      message,
      type: 'error',
    });
  }, []);

  const setSuccess = useCallback((message: string) => {
    setNotification({
      show: true,
      message,
      type: 'success',
    });
  }, []);

  const setWarning = useCallback((message: string) => {
    setNotification({
      show: true,
      message,
      type: 'warning',
    });
  },[]);

  const setInfo = useCallback((message: string) => {
    setNotification({
      show: true,
      message,
      type: 'info',
    });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification({
      show: false,
      message: '',
      type: 'success',
    });
  }, []);

  const value = useMemo(
    () => ({
      notification,
      setSuccess,
      setError,
      setWarning,
      setInfo,
      clearNotification,
    }),
    [notification, setSuccess, setError, setWarning, setInfo, clearNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
