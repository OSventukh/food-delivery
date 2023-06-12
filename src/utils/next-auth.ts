import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { requestData } from './fetch';
import { User } from '@/types/models';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        phone: { label: 'phone', type: 'tel', placeholder: 'phone' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials, req) {
        try {
          const result = await requestData('/api/auth', {
            data: credentials,
            method: 'POST',
          });
          // If no error and we have user data, return it
          if (!result.user) {
            // Return null if user data could not be retrieved
            return null;
          }

          return result.user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        return {
          ...token,
          user: user as User,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        ...token,
      };
    },
  },
};
