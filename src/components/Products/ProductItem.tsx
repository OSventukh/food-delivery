'use client';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import type { Product } from '@/types/context';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
export default function ProductItem({ product }: { product: Product }) {
  return (
    <Grid item>
      <Card sx={{ minWidth: '15rem' }}>
        <CardMedia
          title={product.title}
          sx={{
            height: '10rem',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="h3" sx={{ textAlign: 'center' }}>
            {product.title}
          </Typography>
          <Typography sx={{ mt: '1rem' }} component="p">{product.description}</Typography>
          <Box sx={{ mt: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography component="p">{product.price}</Typography>

            <Button>Buy</Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
