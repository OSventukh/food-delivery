import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/next-auth';
import NewReataurant from '@/components/Admin/EditRestaurant';
import { Role } from '@prisma/client';

export default async function newRestaurantPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== Role.MANAGER) {
    redirect('/signin')
  }

  return <NewReataurant />;
}
