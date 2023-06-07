'use client';
import { useState, useCallback, useMemo } from 'react';
import SideMenuContext from '@/context/sidemenu-context';
import React from 'react';

export default function SideMenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const open = () => {
    setOpenMenu(true);
  };

  const close = () => {
    setOpenMenu(false);
  }

  const toggle = () => {
    setOpenMenu((prevState) => !prevState)
  }

  const value = useMemo(() => ({
    isOpen: openMenu,
    open,
    close,
    toggle,
  }), [openMenu])
  return (
    <SideMenuContext.Provider value={value}>{children}</SideMenuContext.Provider>
  );
}
