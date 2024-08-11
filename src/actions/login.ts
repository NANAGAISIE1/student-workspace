"use server";

import { createServerAction, ZSAError } from "zsa";
import { z } from "zod";
import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const { email, password } = input;

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            throw new ZSAError("NOT_AUTHORIZED", "Invalid credentials");
          default:
            throw new ZSAError("ERROR", "An unknown error occurred");
        }
      }
      throw error;
    }
  });
