import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/next-auth';
import EditProduct from '@/components/Admin/EditProduct';
import { Role } from '@prisma/client';
export default async function newProductPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== Role.MANAGER) {
    redirect('/signin')
  }

  return <EditProduct />;
}
