import { redirect } from 'next/navigation';
import EditRestaurant from '@/components/Admin/EditRestaurant';
import { requestData } from '@/utils/fetch';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/next-auth';
import { Role } from '@prisma/client';

export default async function EditRestaurantPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== Role.MANAGER) {
    redirect('/signin')
  }

  const result = await requestData(`/api/restaurants?id=${params.restaurantId}`, { cache: 'no-cache'})

  return <EditRestaurant initData={result.restaurant} />;
}
