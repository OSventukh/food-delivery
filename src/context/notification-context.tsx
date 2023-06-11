import { createContext } from 'react';
import type { NotificationContext } from '@/types/context';

const NotificationContext = createContext<NotificationContext>({
  notification: {
    show: false,
    message: '',
    type: 'error' || 'success' || 'info' || 'warning',
  },
  setSuccess: (message: string) => {},
  setError: (message: string) => {},
  setWarning: (message: string) => {},
  setInfo: (message: string) => {},
  clearNotification: () => {},
});

export default NotificationContext;
