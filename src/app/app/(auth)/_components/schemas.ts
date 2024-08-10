"use client";

import { object, optional, string, z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signupFormSchema = object({
  name: string({ required_error: "Name is required" }).min(
    2,
    "Name is required",
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  verification: optional(
    string({ required_error: "Verification is required" }).length(
      6,
      "Verification must be 6 characters",
    ),
  ),
});
