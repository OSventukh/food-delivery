import { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function MenuList({ id, editLink, onDelete }: { id: string, editLink: string , onDelete: (id: string) => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const restaurantDeleteClickHandler = (id: string) => {
    setAnchorEl(null);
    onDelete(id)
  };

  return (
    <>
      <IconButton onClick={handleClick} sx={{ color: '#c2afaf' }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ zIndex: '999999' }}
      >
        <MenuItem>
          <Box
            component={Link}
            sx={{ display: 'block', width: '100%', color: 'inherit', textDecoration: 'none' }}
            href={`/${editLink}/${id}`}
          >
            Edit
          </Box>
        </MenuItem>
        <MenuItem onClick={restaurantDeleteClickHandler.bind(null, id)}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
