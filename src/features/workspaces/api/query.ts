import { useQueryWithStatus } from "@/services/convex-query";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";

export const useWorkspaceQuery = () => {
  const useGetWorkspaceById = ({
    workspaceId,
  }: {
    workspaceId: Id<"workspaces">;
  }) => {
    const { data, isError, isPending, isSuccess, error } = useQueryWithStatus(
      api.workspaces.query.getWorkspaceById,
      {
        workspaceId,
      },
    );
    return {
      workspace: data,
      isPending,
      isError,
      isSuccess,
      error,
    };
  };

  const useGetWorkspaces = () => {
    const { data, isError, isPending, isSuccess, error } = useQueryWithStatus(
      api.workspaces.query.getWorkspaces,
    );
    return {
      workspaces: data,
      isPending,
      isError,
      isSuccess,
      error,
    };
  };

  const useGetMostCurrentWorkspace = () => {
    const { data, isError, isPending, isSuccess, error } = useQueryWithStatus(
      api.workspaces.query.getMostCurrentWordspace,
    );
    return {
      workspace: data,
      isPending,
      isError,
      isSuccess,
      error,
    };
  };

  return {
    useGetWorkspaceById,
    useGetWorkspaces,
    useGetMostCurrentWorkspace,
  };
};
