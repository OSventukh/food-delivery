import './globals.css';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import ContexProvider from '@/provider/provider';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/next-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Food delivery',
  description: 'Food delivery in any time',
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContexProvider>
          <Layout session={session}>{children}</Layout>
        </ContexProvider>
      </body>
    </html>
  );
}
