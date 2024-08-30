import { useWorkspaceService } from "@/infrastructure/services/convex-workspace-service";
import { Id } from "@convex/dataModel";

export function useGetWorkspaceById(id: Id<"workspaces">) {
  const { useGetWorkspaceById } = useWorkspaceService();
  const { data: workspace, status, error } = useGetWorkspaceById(id);

  return { workspace, status, error };
}

export function useCreateWorkspace() {
  //   const { useCreateWorkspace } = useWorkspaceService();
  //   const { create, status, error } = useCreateWorkspace();
  //   return { createWorkspace: create, status, error };
}
