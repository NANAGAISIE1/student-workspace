import { Id } from "@convex/dataModel";

export class User {
  constructor(
    public readonly id: Id<"users">,
    public readonly name?: string,
    public readonly image?: string,
    public readonly email?: string,
    public readonly emailVerificationTime?: number,
    public readonly phone?: string,
    public readonly phoneVerificationTime?: number,
    public readonly isAnonymous?: boolean,
    public readonly role?: "student" | "lecturer" | "admin",
  ) {}
}
