'use client';

import SideNavigation from './SideNavigation';
import NavigationBar from '@/components/Layout/NavigationBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function AdminLayout({
  children,
  session,
}: {
  session: any;
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar session={session} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SideNavigation />
        <main style={{ flexGrow: '1' }}><Container>{children}</Container></main>
      </Box>
    </>
  );
}
