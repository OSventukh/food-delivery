type ToggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void

export type SideNavigationProps = {
  open: boolean,
  toggleDrawer: ToggleDrawer
}

export type NavigationBarProps = {
  openSideNavigation: ToggleDrawer
}