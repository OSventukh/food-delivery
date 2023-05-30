import { createContext } from 'react';
import type { NotificationContext } from '@/types/context';

const NotificationContext = createContext<NotificationContext>({
  notification: {
    show: false,
    message: '',
    type: 'error' || 'success' || 'info' || 'warning',
  },
  setNotification: () => {},
});

export default NotificationContext;
