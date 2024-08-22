import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";
import Password from "./auth/credentials_login";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Google, Password],
});
