import ProductsList from '@/components/Products/ProductsList';
import RestaurantsList from '@/components/Restaurants/RestaurantsList';
import ManagerOptions from '@/components/ManagerOptions/ManagerOptions';
import { requestData } from '@/utils/fetch';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/next-auth';
import { Role } from '@prisma/client';

export default async function Home() {
  const restaurantsResult = await requestData('/api/restaurants');
  const productResult = await requestData('/api/products', { cache: 'no-cache'});

  const session = await getServerSession(authOptions);
  
  return (
    <div style={{ maxWidth: '100vw' }}>
      <RestaurantsList restaurants={restaurantsResult.restaurants} />
      <div style={{ width: '100%'}}>
        {session?.user?.role === Role.MANAGER && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <ManagerOptions />
          </div>
        )}
        <ProductsList products={productResult.products} />
      </div>
    </div>
  );
}
