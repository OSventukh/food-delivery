import React from 'react';
import EditRestaurant from '@/components/Admin/EditRestaurant';
import { getData } from '@/utils/fetch';

export default async function EditRestaurantPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const result = await getData(`/api/restaurants?id=${params.restaurantId}`)

  return <EditRestaurant initData={result.restaurant} />;
}
