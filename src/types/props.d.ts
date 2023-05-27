type ToggleDrawer = (
  isOpen: boolean
) => (event: React.KeyboardEvent | React.MouseEvent) => void;

export type SideNavigationProps = {
  open: boolean;
  toggleDrawer: ToggleDrawer;
};

export type NavigationBarProps = {
  openSideNavigation: ToggleDrawer;
};

export type CartItemQuantityProps = {
  product: Product;
  increase: (payload: Product) => void;
  decrease: (payload: Product) => void;
};

export type CheckoutDataProps = {
  onFirstName: (event: ChangeEvent<HTMLInputElement>) => void;
  onLastName: (event: ChangeEvent<HTMLInputElement>) => void;
  onEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  onPhone: (event: ChangeEvent<HTMLInputElement>) => void;
  onStreet: (event: ChangeEvent<HTMLInputElement>) => void;
  onHouseNumber: (event: ChangeEvent<HTMLInputElement>) => void;
};
