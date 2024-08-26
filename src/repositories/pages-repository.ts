import { useQueryWithStatus } from "@/services/convex-query";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";

type UseSortedPages = {
  workspaceId: Id<"workspaces">;
};

export const useSortedPage = ({ workspaceId }: UseSortedPages) => {
  const {
    data: pages,
    isPending,
    error,
    isError,
  } = useQueryWithStatus(api.pages.query.getPagesByWorkspaceId, {
    workspaceId,
  });

  if (isError) {
    console.error(error);
    return { error };
  }

  if (!pages) {
    return;
  }

  const sortedPages = pages.sort((a, b) => b.updatedAt - a.updatedAt);

  return { sortedPages };
};
