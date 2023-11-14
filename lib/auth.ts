import axios from "axios";
import { NextAuthOptions, getServerSession } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        // Get user from database by email and password
        const url = (process.env.BACKEND_URL as string) + "/api/users/signin";
        const response = await axios.post(url, {
          username: credentials.email,
          password: credentials.password,
        });

        const user = response.data;
        console.log(user);

        // If user, returns the user object
        if (user) return user;

        return null;
        // If no user, returns null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    //@ts-ignore
    async signIn(user) {
      const account = user.account;

      if (account?.provider === "google") {
        const {
          // @ts-ignore
          given_name: firstName,
          // @ts-ignore
          family_name: lastName,
          email,
          sub: password,
        } = user.profile || {};

        const url =
          (process.env.BACKEND_URL as string) + "/api/users/auth/google";

        const response = await axios.post(url, {
          firstName,
          lastName,
          email,
          password,
        });

        if (response.status === 200) {
          const data = response.data;
          user = data;
        }
      }
      return true;
    },
    // @ts-ignore
    async session({ session }) {
      const url =
        (process.env.BACKEND_URL as string) +
        "/api/users/get-by-email/" +
        session.user.email;
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = response.data;
        session.user = data;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export async function LoginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/signin");
}

export function LoginIsRequiredClient() {
  if (typeof window === "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const session = useSession();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    if (!session) router.push("/signin");
  }
}
