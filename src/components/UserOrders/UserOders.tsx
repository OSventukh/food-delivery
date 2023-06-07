'use client';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';

export default function UserOders({ items: orders }: { items: any }) {

  return (
    <Container>
      <Paper
        sx={{
          mt: '5rem',
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Orders
        </Typography>
        {orders.map((order: any) => (
          <List key={order.id}>
            <Divider />
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
              }}
            >
              <ListItemText
                primary={new Date(order.createdAt).toLocaleString('uk-UA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {order.items.map((item: any) => (
                  <ListItemText
                    key={item.id}
                    primary={`${item.product.title} - ${item.quantity} pcs.`}
                  />
                ))}
              </Box>
              <ListItemText primary={`Total price: ${order.totalPrice} UAH`} />
            </ListItem>
          </List>
        ))}
      </Paper>
    </Container>
  );
}
