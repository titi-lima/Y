import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "@/lib/api";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const response = await api.post("/sessions", {
          username: credentials?.username,
          password: credentials?.password,
        });

        const { user } = response.data.data;

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;
      console.log(session);
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
