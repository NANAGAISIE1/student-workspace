import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTPPasswordReset } from "./auth/password_reset/otp";
import { ResendOTP } from "./auth/otp/resend";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    GitHub,
    Google,
    Password({
      verify: ResendOTP,
      reset: ResendOTPPasswordReset,
      profile(params) {
        return {
          email: params.email as string,
          name: params.name as string,
        };
      },
    }),
    Anonymous,
  ],
});
