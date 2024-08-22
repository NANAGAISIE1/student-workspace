import { Password } from "@convex-dev/auth/providers/Password";
import { ConvexError } from "convex/values";
import { DataModel } from "../_generated/dataModel";
import { ResendOTPPasswordReset } from "./reset_password";
import { ResendOTP } from "./verify_email";
import { passAuthFlowSchema } from "@/app/(auth)/_components/schemas";

export default Password<DataModel>({
  profile(params) {
    const { error, data } = passAuthFlowSchema.safeParse(params);
    if (error) {
      console.log("error", error);
      throw new ConvexError(error.format());
    }
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
  reset: ResendOTPPasswordReset,
  verify: ResendOTP,
});
