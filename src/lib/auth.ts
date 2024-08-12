import { XataAdapter } from "@auth/xata-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import { client } from "../db";
import authConfig from "./auth.config";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    newUser: boolean;
  }
  interface Session {
    user: {
      /** The user's postal address. */
      newUser: boolean;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/auth-error",
    verifyRequest: "/login",
  },
  events: {
    async linkAccount({ user }) {
      // const userId = user.id as string;
      // await client.db.nextauth_users.update(userId, {
      //   emailVerified: new Date(),
      // });
    },
  },
  adapter: XataAdapter(client),
  ...authConfig,
  session: {
    strategy: "jwt",
  },
});
