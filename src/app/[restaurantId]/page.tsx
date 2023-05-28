import React from 'react'
import { getData } from '@/utils/fetch';
import RestaurantsList from '@/components/Restaurants/RestaurantsList';
import ProductsList from '@/components/Products/ProductsList';

export default async function RestaurantPage({ params }: {params: { restaurantId: string }}) {
  const restaurantId = params.restaurantId;
  
  const allRestaurants = await getData('/api/restaurants');
  const currentRestaurants = await getData(`/api/restaurants?id=${restaurantId}`);

  return (
    <div style={{ display: 'flex', gap: '1rem'}}>
    <RestaurantsList restaurants={allRestaurants.restaurants} />
    <ProductsList products={currentRestaurants.restaurant.products} />
  </div>
  )
}
