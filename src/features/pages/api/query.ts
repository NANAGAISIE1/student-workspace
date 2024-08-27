import { useWorkspaceStore } from "@/features/workspaces/store/workspace-store";
import { useQueryWithStatus } from "@/services/convex-query";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";

export const usePageQueries = () => {
  const { workspaceId: storedWorkspaceID } = useWorkspaceStore();

  const useGetPageById = (pageId: Id<"pages">) => {
    const { data, error, isError, isPending } = useQueryWithStatus(
      api.pages.query.getPageById,
      {
        pageId: pageId,
      },
    );
    return {
      data,
      error,
      isError,
      isPending,
    };
  };

  const useGetPagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const workspaceIdToUse = workspaceId
      ? workspaceId
      : (storedWorkspaceID as Id<"workspaces">);

    const { data, error, isError, isPending } = useQueryWithStatus(
      api.pages.query.getPagesByWorkspaceId,
      workspaceIdToUse
        ? {
            workspaceId: workspaceIdToUse,
          }
        : "skip",
    );

    return {
      data,
      error,
      isError,
      isPending,
    };
  };

  const useGetPrivatePagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const workspaceIdToUse = workspaceId
      ? workspaceId
      : (storedWorkspaceID as Id<"workspaces">);

    const { data, error, isError, isPending } = useQueryWithStatus(
      api.pages.query.getPrivatePagesByWorkspaceId,
      workspaceIdToUse
        ? {
            workspaceId: workspaceIdToUse,
          }
        : "skip",
    );

    return {
      data,
      error,
      isError,
      isPending,
    };
  };

  const useGetSharedPagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const workspaceIdToUse = workspaceId
      ? workspaceId
      : (storedWorkspaceID as Id<"workspaces">);

    const { data, error, isError, isPending } = useQueryWithStatus(
      api.pages.query.getSharedPagesByWorkspaceId,
      workspaceIdToUse
        ? {
            workspaceId: workspaceIdToUse,
          }
        : "skip",
    );

    return {
      data,
      error,
      isError,
      isPending,
    };
  };

  const useGetFavoritePagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const workspaceIdToUse = workspaceId
      ? workspaceId
      : (storedWorkspaceID as Id<"workspaces">);

    const { data, error, isError, isPending } = useQueryWithStatus(
      api.pages.query.getFavoritePagesByWorkspaceId,
      workspaceIdToUse
        ? {
            workspaceId: workspaceIdToUse,
          }
        : "skip",
    );

    return {
      data,
      error,
      isError,
      isPending,
    };
  };

  const useGetArchivedPagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const workspaceIdToUse = workspaceId
      ? workspaceId
      : (storedWorkspaceID as Id<"workspaces">);

    const { data, error, isError, isPending } = useQueryWithStatus(
      api.pages.query.getArchivedPagesByWorkspaceId,
      workspaceIdToUse
        ? {
            workspaceId: workspaceIdToUse,
          }
        : "skip",
    );

    return {
      data,
      error,
      isError,
      isPending,
    };
  };

  return {
    useGetPageById,
    useGetPagesByWorkspaceId,
    useGetSharedPagesByWorkspaceId,
    useGetPrivatePagesByWorkspaceId,
    useGetFavoritePagesByWorkspaceId,
    useGetArchivedPagesByWorkspaceId,
  };
};
