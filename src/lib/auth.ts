import { XataAdapter } from "@auth/xata-adapter";
import NextAuth from "next-auth";
import { client } from "../db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: XataAdapter(client),
  ...authConfig,
  session: {
    strategy: "jwt",
  },
});
