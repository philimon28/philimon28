import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import mongoose from 'mongoose';
import { AuthTypeKeys } from '@/constants';
import connectDB from '@/DB/connectDB';
import User, { IUser } from '@/models/User';
import { hash } from 'bcryptjs';

const adapter = MongoDBAdapter(
  new Promise(async (resolve) => {
    await connectDB();
    resolve(mongoose.connection.getClient());
  }),
);
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  events: {
    // implement all event handlers
    signIn: async (message) => {
      console.log('signIn event ---> ', message);
    },
    signOut: async (message) => {
      // console.log('signOut event ---> ', message);
    },
    createUser: async (message) => {
      // console.log('createUser event ---> ', message);
    },
    linkAccount: async (message) => {
      // console.log('linkAccount event ---> ', message);
    },
  },

  /* logger: {
     error(code, metadata) {
       console.error('erro ----> : ', code, metadata);
     },
     warn(code) {
       console.warn('warn ------> ', code);
     },
     debug(code, metadata) {
       console.debug('debug ------> ', code, metadata);
     },
   },*/
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(
        'signIn callback ---> ',
        'user : ',
        user,
        'account : ',
        account,
        'profile : ',
        profile,
        'email : ',
        email,
        'credentials : ',
        JSON.stringify(credentials, null, 2),
      );

      return !!(account?.type === 'credentials' && user);
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect callback ---> ', 'url', url, 'baseUrl', baseUrl);

      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser, trigger, session }) {
      console.log(
        'jwt callback ---> ',
        'token:',
        token,
        'user: ',
        user,
        'account: ',
        account,
        'profile: ',
        profile,
        'isNewUser: ',
        isNewUser,
      );

      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token, user }) {
      console.log(
        'session callback ---> ',
        'session',
        session,
        'token',
        token,
        'user',
        user,
      );
      return {
        ...session,
        user: {
          ...session?.user,
          id: token.id,
          isTalent: token.isTalent,
          isAdmin: token.isAdmin,
          talent: token.talent,
          name: token.name,
          username: token.username,
          phone: token.phone,
        },
      };
    },
  },
  debug: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    error: '/auth/signup',
    signIn: '/auth/register',
    signOut: undefined,
  },
  adapter: adapter,
  providers: [
    // freelancer signup
    CredentialsProvider({
      id: AuthTypeKeys.FREELANCER,
      name: AuthTypeKeys.FREELANCER,
      credentials: {},
      async authorize(credential: any) {
        if (!credential) {
          throw new Error('credential is required');
        }

        const { firstName, lastName, country, password, email } = credential;

        // console.log('authorize credential client ---> ', credential);

        const ifExist = await User.findOne({ email });
        if (ifExist) {
          const error = new Error('this User is already exist');
          (error as any).code = 406;
          throw error;
        }

        const hashedPassword = await hash(password, 12);

        const newUser: IUser = {
          firstName,
          lastName,
          email,
          password,
          address: {
            country,
          },
        };

        const createUser = await User.create(newUser);

        console.log('createUser ---> ', createUser);

        return createUser as any;
      },
    }),

    // talent signup
    CredentialsProvider({
      id: AuthTypeKeys.CLIENT,
      name: AuthTypeKeys.CLIENT,
      credentials: {},
      async authorize(credential: any) {
        if (!credential) {
          throw new Error('credential is required');
        }

        const { firstName, lastName, companyName, country, password, email } =
          credential;

        // console.log('authorize credential client ---> ', credential);

        const ifExist = await User.findOne({ email });
        if (ifExist) {
          const error = new Error('this User is already exist');
          (error as any).code = 406;
          throw error;
        }

        const hashedPassword = await hash(password, 12);

        const newUser: IUser = {
          firstName,
          lastName,
          email,
          password,
          address: {
            country,
          },
        };

        const createUser = await User.create(newUser);

        console.log('createUser ---> ', createUser);

        return createUser as any;
      },
    }),

    // login
    CredentialsProvider({
      id: AuthTypeKeys.LOGIN,
      name: AuthTypeKeys.LOGIN,
      credentials: {
        phone: { label: 'phone', type: 'number' },
        code: { label: 'code', type: 'text' },
      },
      async authorize(credential) {
        const { email, password } = credential as Record<string, string>;

        const user = await User.findOne({ email });

        console.log('login User ---> ', user);

        if (!user) {
          throw new Error('This User is not exist');
        }

        const isMatch = user.password === password;
        if (!isMatch) {
          throw new Error('password is not correct');
        }

        return user as any;
      },
    }),

    // refresh-token
    CredentialsProvider({
      id: 'refresh-token',
      name: 'refresh-token',
      credentials: {
        userId: { label: 'phone', type: 'number' },
      },
      async authorize(credential) {
        const { userId } = credential as Record<string, string>;

        // console.log('refresh-token User ---> ', user);
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    EmailProvider({}),
  ],
};

export default NextAuth(authOptions);
