import { redirect } from 'next/navigation';
import UserOders from "@/components/UserOrders/UserOders"
import { requestData } from "@/utils/fetch"
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/next-auth';


export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }
  const result = await requestData(`/api/users?id=${session.user.id}`)

  return (
    <UserOders items={result.user.orders}/>
  )
}
