/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.14.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as documents_mutation from "../documents/mutation.js";
import type * as documents_query from "../documents/query.js";
import type * as http from "../http.js";
import type * as otp_resend from "../otp/resend.js";
import type * as otp_verification from "../otp/verification.js";
import type * as password_reset_email from "../password_reset/email.js";
import type * as password_reset_otp from "../password_reset/otp.js";
import type * as user_query from "../user/query.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "documents/mutation": typeof documents_mutation;
  "documents/query": typeof documents_query;
  http: typeof http;
  "otp/resend": typeof otp_resend;
  "otp/verification": typeof otp_verification;
  "password_reset/email": typeof password_reset_email;
  "password_reset/otp": typeof password_reset_otp;
  "user/query": typeof user_query;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
