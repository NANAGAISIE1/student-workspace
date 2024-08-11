import { XataAdapter } from "@auth/xata-adapter";
import NextAuth from "next-auth";
import { client } from "../db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/auth-error",
    verifyRequest: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  events: {
    async linkAccount({ user }) {
      const userId = user.id as string;
      await client.db.nextauth_users.update(userId, {
        emailVerified: new Date(),
      });
    },
  },
  adapter: XataAdapter(client),
  ...authConfig,
  session: {
    strategy: "jwt",
  },
});
