'use client';

import { useState } from 'react';
import NavigationBar from './NavigationBar';


export default function Layout({ session, children }: { session: any, children: React.ReactNode }) {
  return (
    <>
      <NavigationBar session={session} />
      <main>
        {children}
      </main>
    </>
  );
}
