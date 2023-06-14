'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NotificationContext from '@/context/notification-context';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import type { Product } from '@/types/context';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import CartContext from '@/context/cart-context';
import MenuList from '../UI/Menu';
import { Role } from '@prisma/client';
import { requestData } from '@/utils/fetch';

export default function ProductItem({ product }: { product: Product }) {
  const { addToCart } = useContext(CartContext);
  const { setSuccess, setError, clearNotification } =
    useContext(NotificationContext);
  const { data: session } = useSession();

  const router = useRouter();

  const productDeleteHandler = async (id: string) => {
    try {
      clearNotification();
      const response = await requestData(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      setSuccess(
        response?.message
          ? response.message
          : 'Product was successfully deleted'
      );
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    }
  };
  
  return (
    <Grid item>
      <Card sx={{ position: 'relative', width: '20rem', height: '100%' }}>
        {session && session.user.role == Role.MANAGER && (
          <Box
            sx={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1 }}
          >
            <MenuList
              id={product.id}
              editLink="edit-product"
              onDelete={productDeleteHandler}
            />
          </Box>
        )}
        <CardMedia
          title={product.title}
          sx={{
            height: '10rem',
            position: 'relative',
          }}
        >
          {product.image && (
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 700px) 100px, 300px"
              style={{
                objectFit: 'contain',
              }}
            />
          )}
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="h3" sx={{ textAlign: 'center' }}>
            {product.title}
          </Typography>
          <Typography sx={{ mt: '1rem' }} component="p">
            {product.description}
          </Typography>
          <Box
            sx={{
              mt: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography component="p">{product.price} UAH</Typography>

            <Button onClick={addToCart.bind(null, product)}>Buy</Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
