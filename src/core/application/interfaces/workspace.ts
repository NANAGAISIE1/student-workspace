import { Workspace, WorkspaceMember } from "@/core/domain/entities/workspace";
import { Id } from "@convex/dataModel";

export interface WorkspaceRepository {
  getWorkspaceById(id: Id<"workspaces">): Promise<Workspace | null>;
  getWorkspacesByOwnerId(ownerId: Id<"users">): Promise<Workspace[]>;
  createWorkspace(workspace: Omit<Workspace, "id">): Promise<Workspace>;
  updateWorkspace(workspace: Workspace): Promise<Workspace>;
  deleteWorkspace(id: Id<"workspaces">): Promise<void>;
}

export interface WorkspaceMemberRepository {
  getMembersByWorkspaceId(
    workspaceId: Id<"workspaces">,
  ): Promise<WorkspaceMember[]>;
  getMembersByUserId(userId: Id<"users">): Promise<WorkspaceMember[]>;
  addMember(member: Omit<WorkspaceMember, "id">): Promise<WorkspaceMember>;
  updateMember(member: WorkspaceMember): Promise<WorkspaceMember>;
  removeMember(id: Id<"workspaceMembers">): Promise<void>;
}
