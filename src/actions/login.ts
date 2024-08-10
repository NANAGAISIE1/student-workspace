"use server";
import { createServerAction } from "zsa";
import { z } from "zod";
import { saltAndHashPassword } from "@/lib/password";

export const login = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const hashedPassword = await saltAndHashPassword(input.password);

    // const existingUser = await client.db.nextauth_users
    //   .filter({ email: input.email })
    //   .getFirst();

    return { success: "Email sent" };
  });
