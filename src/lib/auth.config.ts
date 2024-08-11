import { getUserByEmail } from "../db/utils";
import { loginFormSchema } from "../app/(auth)/_components/schemas";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
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
};
