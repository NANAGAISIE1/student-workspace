import { Id } from "@convex/dataModel";

export class Workspace {
  constructor(
    public readonly id: Id<"workspaces">,
    public readonly name: string,
    public readonly ownerId: Id<"users">,
    public readonly updatedAt: number,
    public readonly archived?: boolean,
    public readonly updatedBy?: Id<"users">,
    public readonly plan?: "free" | "personal" | "team",
  ) {}
}

export class WorkspaceMember {
  constructor(
    public readonly id: Id<"workspaceMembers">,
    public readonly workspaceId: Id<"workspaces">,
    public readonly userId: Id<"users">,
    public readonly role: "admin" | "member" | "guest",
  ) {}
}
