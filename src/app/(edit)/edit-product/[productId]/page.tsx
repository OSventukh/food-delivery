import { redirect } from 'next/navigation';
import EditProduct from '@/components/Admin/EditProduct'
import { requestData } from '@/utils/fetch'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/next-auth';
import { Role } from '@prisma/client';

export default async function EditProductPage({ params }: { params: { productId: string }}) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== Role.MANAGER) {
    redirect('/signin')
  }

  const result = await requestData(`/api/products?id=${params.productId}`, { cache: 'no-store', tags: ['product']});
  return (
    <EditProduct key={result.product.id} initData={result.product} />
  )
}
