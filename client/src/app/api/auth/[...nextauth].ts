import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "@/lib/api";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const response = await api.post("/sessions", {
          email: credentials.username,
          password: credentials.password,
        });

        const user = response.data.data.loggedUser;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
