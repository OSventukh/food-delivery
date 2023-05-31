'use client';

import { useContext } from 'react';
import NotificationContext from '@/context/notification-context';
import SideNavigation from './SideNavigation';
import NavigationBar from '@/components/Layout/NavigationBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Snack from '@/components/UI/SnackBar';
export default function AdminLayout({
  children,
  session,
}: {
  session: any;
  children: React.ReactNode;
}) {
  const {notification} = useContext(NotificationContext);

  return (
    <>
      <NavigationBar session={session} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SideNavigation />
        <main style={{ flexGrow: '1' }}><Container>{children}</Container></main>
      </Box>
      <Snack show={notification.show} text={notification.message} type={notification.type} />
    </>
  );
}
