import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const { username, password } = credentials as any;

        const url = process.env.BACKEND_URL + "/api/users/signin";
        const res = await axios.post(url, { username, password });
        if (res.status === 200) {
          return await res.data;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
