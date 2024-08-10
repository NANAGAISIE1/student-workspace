"use server";

import { saltAndHashPassword } from "@/lib/password";
import { client } from ".";

export async function getUserByCredentials({
  email,
  passwordHash,
}: {
  email: string;
  passwordHash: string;
}) {
  try {
    const user = await client.db.nextauth_users.filter({ email }).getFirst();

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    if (user.passwordHash === passwordHash) {
      throw new Error(`Incorrect password for user with email ${email}`);
    }

    return user.toString;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong. Please try again");
  }
}

export async function getUserByEmail({ email }: { email: string }) {
  try {
    const user = await client.db.nextauth_users.filter({ email }).getFirst();
    return user;
  } catch {
    return null;
  }
}
export async function getUserById({ id }: { id: string }) {
  try {
    const user = await client.db.nextauth_users.filter({ id }).getFirst();
    return user;
  } catch {
    return null;
  }
}

type SignUPError = {
  message: string;
};

export async function registerUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const existingUser = await client.db.nextauth_users
      .filter({ email })
      .getFirst();

    if (existingUser) {
      throw new Error(`User with ${email} already exists`);
    }
    const hashedPassword = await saltAndHashPassword(password);
    await client.db.nextauth_users.create({
      email,
      passwordHash: hashedPassword,
      name,
    });
    return { message: "User created successfully", status: 200 };
  } catch (error) {
    console.log({ "sign-up-error": error });
    throw new Error(`${(error as SignUPError).message}`);
  }
}
