import { AuthError, NextAuthConfig } from "next-auth";
import { ZodError } from "zod";
import { getUserByCredentials } from "../db/utils";
import { saltAndHashPassword } from "./password";
import { loginFormSchema } from "../app/app/(auth)/_components/schemas";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
export default {
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/login",
  },
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
        try {
          let user = null;

          const { email, password } = await loginFormSchema.parseAsync(
            credentials,
          );

          // logic to salt and hash password
          const pwHash = await saltAndHashPassword(password);

          // logic to verify if the user exists
          user = await getUserByCredentials({ email, passwordHash: pwHash });

          if (!user) {
            throw new Error("User not found.");
          }

          // return JSON object with the user data
          return JSON.parse(user());
        } catch (error) {
          if (error instanceof AuthError) {
            switch (error.type) {
              case "CredentialsSignin":
                return { msg: "Invalid credentials", status: "error" };
              case "CredentialsSignin":
                throw error;
              default:
                return { msg: "Something went wrong", status: "error" };
            }
          }
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-expect-error
        id: token.sub,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      return session;
    },
  },
} satisfies NextAuthConfig;
