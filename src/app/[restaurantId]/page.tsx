import React from 'react';
import { getData } from '@/utils/fetch';
import RestaurantsList from '@/components/Restaurants/RestaurantsList';
import ProductsList from '@/components/Products/ProductsList';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/next-auth';
import { Role } from '@prisma/client';
import ManagerOptions from '@/components/ManagerOptions/ManagerOptions';

export default async function RestaurantPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const restaurantId = params.restaurantId;

  const allRestaurants = await getData('/api/restaurants');
  const currentRestaurants = await getData(
    `/api/restaurants?id=${restaurantId}`
  );
  const session = await getServerSession(authOptions);

  return (
    <div style={{ maxWidth: '100vw' }}>
      <RestaurantsList restaurants={allRestaurants.restaurants} />
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
        <ProductsList products={currentRestaurants.restaurant.products} />
      </div>
    </div>
  );
}
