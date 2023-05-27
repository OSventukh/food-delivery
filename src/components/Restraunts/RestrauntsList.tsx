import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const restraunts = [
  { name: 'MacDonalds', id: 1 },
  { name: 'KFC', id: 2 },
  { name: 'PizzaHunt', id: 3 },

]

export default function RestrauntsList() {
  return (
    <List>
      {restraunts.map((item, index) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
