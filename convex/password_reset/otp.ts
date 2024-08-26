import { Email } from "@convex-dev/auth/providers/Email";
import { alphabet, generateRandomString } from "oslo/crypto";
import { Resend as ResendAPI } from "resend";
import { PasswordResetEmail } from "./email";

export const ResendOTPPasswordReset = Email({
  id: "resend-otp-password-reset",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(6, alphabet("0-9"));
  },
  async sendVerificationRequest({
    identifier: email,
    provider,
    token,
    expires,
  }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      // TODO: Update with your app name and email address
      from:
        process.env.AUTH_EMAIL ?? "Student Workspace <onboarding@resend.dev>",
      to: [email],
      subject: `Reset password in Student Workspace`,
      react: PasswordResetEmail({ code: token, expires }),
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});
