import React from 'react';
import EditRestaurant from '@/components/Admin/EditRestaurant';
import { requestData } from '@/utils/fetch';

export default async function EditRestaurantPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const result = await requestData(`/api/restaurants?id=${params.restaurantId}`, { cache: 'no-cache'})

  return <EditRestaurant initData={result.restaurant} />;
}
