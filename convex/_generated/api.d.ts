/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth_otp_resend from "../auth/otp/resend.js";
import type * as auth_otp_verification from "../auth/otp/verification.js";
import type * as auth_password_reset_email from "../auth/password_reset/email.js";
import type * as auth_password_reset_otp from "../auth/password_reset/otp.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as pages_helpers from "../pages/helpers.js";
import type * as pages_mutation from "../pages/mutation.js";
import type * as pages_query from "../pages/query.js";
import type * as shared_mutation from "../shared/mutation.js";
import type * as templates_class_notes_template from "../templates/class_notes_template.js";
import type * as templates_getting_started_template from "../templates/getting_started_template.js";
import type * as templates_index from "../templates/index.js";
import type * as templates_research_paper_template from "../templates/research_paper_template.js";
import type * as templates_resume_template from "../templates/resume_template.js";
import type * as templates_type from "../templates/type.js";
import type * as user_query from "../user/query.js";
import type * as workspaces_mutation from "../workspaces/mutation.js";
import type * as workspaces_query from "../workspaces/query.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "auth/otp/resend": typeof auth_otp_resend;
  "auth/otp/verification": typeof auth_otp_verification;
  "auth/password_reset/email": typeof auth_password_reset_email;
  "auth/password_reset/otp": typeof auth_password_reset_otp;
  auth: typeof auth;
  http: typeof http;
  "pages/helpers": typeof pages_helpers;
  "pages/mutation": typeof pages_mutation;
  "pages/query": typeof pages_query;
  "shared/mutation": typeof shared_mutation;
  "templates/class_notes_template": typeof templates_class_notes_template;
  "templates/getting_started_template": typeof templates_getting_started_template;
  "templates/index": typeof templates_index;
  "templates/research_paper_template": typeof templates_research_paper_template;
  "templates/resume_template": typeof templates_resume_template;
  "templates/type": typeof templates_type;
  "user/query": typeof user_query;
  "workspaces/mutation": typeof workspaces_mutation;
  "workspaces/query": typeof workspaces_query;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
