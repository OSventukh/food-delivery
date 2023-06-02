import ProductsList from '@/components/Products/ProductsList';
import RestaurantsList from '@/components/Restaurants/RestaurantsList';
import ManagerOptions from '@/components/ManagerOptions/ManagerOptions';
import { getData } from '@/utils/fetch';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/next-auth';
import { Role } from '@prisma/client';

export default async function Home() {
  const restaurantsResult = await getData('/api/restaurants');
  const productResult = await getData('/api/products');
  const session = await getServerSession(authOptions);

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <RestaurantsList restaurants={restaurantsResult.restaurants} />
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
           {session?.user?.role === Role.MANAGER && <ManagerOptions />}
          </div>
          <ProductsList products={productResult.products} />
        </div>
      </div>
    </>
  );
}
