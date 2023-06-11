import { useContext, useState } from 'react';
import Link from 'next/link';
import { styled, alpha, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import mainTheme from '@/theme';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartContext from '@/context/cart-context';
import SideMenuContext from '@/context/sidemenu-context';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { signIn, signOut } from 'next-auth/react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export default function NavigationBar({ session }: { session: any }) {
  const { totalQuantity } = useContext(CartContext);
  const { toggle } = useContext(SideMenuContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExit = () => {
    signOut();
    handleClose();
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: '2rem' }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <FastfoodIcon />
              Food Delivery
            </Typography>
            <IconButton
              sx={{ color: 'inherit', display: { md: 'none' } }}
              onClick={toggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Link href="/cart">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="shopping cart"
              sx={{ ml: 2 }}
            >
              <Badge badgeContent={totalQuantity} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {session && (
              <MenuItem onClick={handleClose} component={Link} href="/myorders">
                Orders
              </MenuItem>
            )}
            {session && <MenuItem onClick={handleExit}>Exit</MenuItem>}
            {!session && (
              <MenuItem onClick={() => signIn()}>Login</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
