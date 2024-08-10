"use server";
import { createServerAction, ZSAError } from "zsa";
import { z } from "zod";
import { saltAndHashPassword } from "@/lib/password";
import { client } from "@/db";
import { getUserByEmail } from "@/db/utils";

export const register = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
      name: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const hashedPassword = await saltAndHashPassword(input.password);

    const existingUser = await getUserByEmail({ email: input.email });

    if (existingUser) {
      throw new ZSAError("CONFLICT", `User with ${input.email} already exists`);
    }

    await client.db.nextauth_users.create({
      email: input.email,
      passwordHash: hashedPassword,
      name: input.name,
    });

    // TODO: Send email verification
    return { success: true };
  });
