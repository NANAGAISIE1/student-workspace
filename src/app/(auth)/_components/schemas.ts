import { object, optional, string, z } from "zod";

export const passAuthFlowSchema = object({
  email: string().email(),
  name: optional(z.string().min(2)),
  password: z.string().min(8),
  flow: z.enum(["signIn", "signUp"]),
});
