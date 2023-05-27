import React from 'react'
import { getData } from '@/utils/fetch'
export default async function RestaurantPage({ params }: {params: { restaurantId: string }}) {
  const restaurantId = params.restaurantId;
  
  const result = await getData(`/api/restaurants?id=${restaurantId}`)
  return (
    <div>page</div>
  )
}
