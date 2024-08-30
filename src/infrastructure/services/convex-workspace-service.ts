import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { useQueryWithStatus } from "../api/query";

export const useWorkspaceService = () => {
  const useGetWorkspaceById = (id: Id<"workspaces">) => {
    return useQueryWithStatus(api.workspaces.query.getWorkspaceById, {
      workspaceId: id,
    });
  };

  //   const useGetWorkspacesByOwnerId = (ownerId: Id<"users">) => {
  //     return useQueryWithStatus(api.workspaces.query.getWorkspaceById, {
  //       ownerId,
  //     });
  //   };

  //   const useCreateWorkspace = () => {
  //     const [createWorkspaceMutation, { status, error }] = useMutation(
  //       api.workspaces.mutation.createWorkspace,
  //     );
  //     const create = async (workspaceData: Omit<Doc<"workspaces">, "id">) => {
  //       await createWorkspaceMutation(workspaceData);
  //     };
  //     return { create, status, error };
  //   };

  //   const useUpdateWorkspace = () => {
  //     const [updateWorkspaceMutation, { status, error }] = useMutation(
  //       api.workspaces.mutation.updateWorkspace,
  //     );
  //     const update = async (workspace: Doc<"workspaces">) => {
  //       await updateWorkspaceMutation(workspace);
  //     };
  //     return { update, status, error };
  //   };

  //   const useDeleteWorkspace = () => {
  //     const [deleteWorkspaceMutation, { status, error }] = useMutation(
  //       api.workspaces.mutation.deleteWorkspace,
  //     );
  //     const remove = async (id: Id<"workspaces">) => {
  //       await deleteWorkspaceMutation({ id });
  //     };
  //     return { remove, status, error };
  //   };

  return {
    useGetWorkspaceById,
    // useGetWorkspacesByOwnerId,
    // useCreateWorkspace,
    // useUpdateWorkspace,
    // useDeleteWorkspace,
  };
};
