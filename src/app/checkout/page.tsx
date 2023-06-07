import React from 'react'
import Checkout from '@/components/Checkout/Checkout'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/next-auth';

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)
  return (
    <Checkout session={session} />
  )
}
