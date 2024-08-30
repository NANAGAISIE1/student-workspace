import { Doc, Id } from "@convex/dataModel";

export interface WorkspaceService {
  getWorkspaceById(id: Id<"workspaces">): Promise<Doc<"workspaces"> | null>;
  getWorkspacesByOwnerId(ownerId: Id<"users">): Promise<Doc<"workspaces">[]>;
  createWorkspace(
    workspace: Omit<Doc<"workspaces">, "id">,
  ): Promise<Doc<"workspaces">>;
  updateWorkspace(workspace: Doc<"workspaces">): Promise<Doc<"workspaces">>;
  deleteWorkspace(id: Id<"workspaces">): Promise<void>;
}

export interface WorkspaceMemberService {
  getMembersByWorkspaceId(
    workspaceId: Id<"workspaces">,
  ): Promise<Doc<"workspaceMembers">[]>;
  getMembersByUserId(userId: Id<"users">): Promise<Doc<"workspaceMembers">[]>;
  addMember(
    member: Omit<Doc<"workspaceMembers">, "id">,
  ): Promise<Doc<"workspaceMembers">>;
  updateMember(
    member: Doc<"workspaceMembers">,
  ): Promise<Doc<"workspaceMembers">>;
  removeMember(id: Id<"workspaceMembers">): Promise<void>;
}
