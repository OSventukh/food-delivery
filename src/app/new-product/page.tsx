import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/next-auth';
import NewProduct from '@/components/Admin/NewProduct/NewProduct';

export default async function newProductPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/signin');
  }

  return <NewProduct />;
}
