type ToggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void

export type SideNavigationProps = {
  open: boolean,
  toggleDrawer: ToggleDrawer
}

export type NavigationBarProps = {
  openSideNavigation: ToggleDrawer
}

export type CartItemQuantityProps = {
  product: Product;
  increase: (payload: Product) => void;
  decrease: (payload: Product) => void;
}