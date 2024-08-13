import { XataAdapter } from "@auth/xata-adapter";
import { skipCSRFCheck } from "@auth/core";
import NextAuth, { type DefaultSession } from "next-auth";
import { client } from "../db";
import authConfig from "./auth.config";
import { getToken } from "next-auth/jwt";

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

export const isSecureContext = process.env.NODE_ENV !== "development";

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
  ...(!isSecureContext
    ? { skipCSRFCheck: skipCSRFCheck, trustHost: true }
    : {}),
  session: {
    strategy: "jwt",
  },
});

export const invalidateSessionToken = async (token: string) => {
  await XataAdapter(client).deleteSession?.(token);
};

export const validateToken = async (token: string) => {
  try {
    const decodedToken = await getToken({
      req: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      secret: process.env.NEXTAUTH_SECRET!,
      salt: process.env.NEXTAUTH_SALT!, // Add the salt property
    });
    if (!decodedToken) {
      throw new Error("Invalid token");
    }
    return decodedToken;
  } catch (error) {
    console.error("Token validation error:", error);
    throw new Error("Token validation failed");
  }
};
