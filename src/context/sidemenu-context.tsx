import { createContext } from 'react';
import { SideMenuContext } from '@/types/context';

const SideMenuContext = createContext<SideMenuContext>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
  open: () => {},
});

export default SideMenuContext;
