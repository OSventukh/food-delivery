import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sendData } from './fetch';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        phone: { label: 'phone', type: 'phone', placeholder: 'phone' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const result = await sendData('/api/auth', credentials);
        // If no error and we have user data, return it
        if (!result.user) {
          // Return null if user data could not be retrieved
          return null;
        }

        return result.user
        
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
  
        return {
          ...token,
          user: user,
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
