/* eslint-disable import/no-anonymous-default-export */
import { getUserByEmail } from "../db/utils";
import { loginFormSchema } from "../app/(auth)/_components/schemas";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import { client } from "@/db";

export default {
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = loginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail({ email });

          if (!user || !user.passwordHash) {
            return null;
          }

          const passwordsMatch = await compare(password, user.passwordHash);

          if (passwordsMatch) return JSON.parse(user.toString());
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        const documents = await client.db.documents
          .filter({
            "user.id": token.sub,
          })
          .getAll();
        if (documents.length === 0) {
          session.user.newUser = true;
        } else {
          session.user.newUser = false;
        }
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
} satisfies NextAuthConfig;
