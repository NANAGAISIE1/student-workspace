import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  flow: z.literal("signIn"),
});

export const registerationFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  flow: z.literal("signUp"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const passwordVerificationFormSchema = z.object({
  email: z.string().email(),
  code: z
    .string()
    .min(6, "Code must be 6 characters")
    .max(6, "Code must be 6 characters"),
  flow: z.literal("email-verification"),
});

export type VerifyPasswordFormValues = z.infer<
  typeof passwordVerificationFormSchema
>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerationFormSchema>;

export interface RegistrationFormProps {
  onSuccess: (email: string) => void;
}
export interface VerificationFormProps {
  email: string;
}

export type ResetFormProps = {
  provider: string;
  step: {
    email: string;
  };
};
