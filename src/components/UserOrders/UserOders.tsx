'use client';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ListItemText from '@mui/material/ListItemText';
export default function UserOders({ items: orders }: { items: any }) {
  return (
    <Container>
      <Typography variant='h3' sx={{ textAlign: 'center'}}>Orders</Typography>
      {orders.map((order: any) => (
        <List key={order.id}>
          <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
            <ListItemText primary={`Total price: ${order.totalPrice}`} />
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              {order.items.map((item: any) => (
                <ListItemText
                  key={item.id}
                  primary={`${item.product.title} - ${item.quantity}`}
                />
              ))}
            </Box>
          </ListItem>
          <Divider/>
        </List>
      ))}
    </Container>
  );
}
