import { useRouter } from "next/navigation";
import { usePageMutations } from "../api/mutations";
import { Id } from "@convex/dataModel";
import { toast } from "sonner";
import { useWorkspaceStore } from "@/features/workspaces/store/workspace-store";
import { usePageQueries } from "../api/query";
import { useWorkspaceQuery } from "@/features/workspaces/api/query";

export const usePage = () => {
  const router = useRouter();
  const { workspaceId: storedWorkspaceId, setCurrentWorkspaceId } =
    useWorkspaceStore((state) => state);
  const { useGetMostCurrentWorkspace } = useWorkspaceQuery();
  const {
    useGetPrivatePagesByWorkspaceId,
    useGetArchivedPagesByWorkspaceId,
    useGetFavoritePagesByWorkspaceId,
    useGetSharedPagesByWorkspaceId,
    useGetPageById,
    useGetPagesByWorkspaceId,
    useGetFavoriteStatus,
  } = usePageQueries();
  const {
    useToggleArchivePage,
    useToggleFavorite,
    useCreatePage,
    useRenamePageById,
    useDeletePagePermanentlyById,
  } = usePageMutations();

  const createPageMutation = useCreatePage();

  const {
    mutate: deletePagePermanently,
    data: deletedPageId,
    isPending: isDeletePagePermanentlyPending,
    isError: isDeletePagePermanentlyError,
    error: deletePagePermanentlyError,
  } = useDeletePagePermanentlyById();

  const {
    mutate: renamePage,
    data: renamedPageId,
    isPending: isRenamePagePending,
    isError: isRenamePageError,
    error: renamePageError,
  } = useRenamePageById();

  const {
    mutate: toggleFavorite,
    data: toggleFavoritePageId,
    isPending: istoggleFavoritePending,
    isError: istoggleFavoriteError,
    error: toggleFavoriteError,
  } = useToggleFavorite();

  const {
    mutate: toggleArchivePage,
    data: toggleArchivePageId,
    isPending: istoggleArchivePending,
    isError: istoggleArchiveError,
    error: toggleArchiveError,
  } = useToggleArchivePage();

  const {
    workspace,
    error: getCurrentWorkspaceError,
    isError: isGetCurrentWorkspaceError,
    isPending: isGetCurrentWorkspacePending,
  } = useGetMostCurrentWorkspace();

  if (storedWorkspaceId === undefined) {
    if (isGetCurrentWorkspacePending) {
      toast.loading("Getting workspace...");
    }
    if (isGetCurrentWorkspaceError) {
      console.error(getCurrentWorkspaceError);
      toast.error("Failed to get workspace");
    }
    if (workspace) {
      setCurrentWorkspaceId(workspace._id);
    }
  }

  const createPage = async (
    workspaceId?: Id<"workspaces">,
    parentId?: Id<"pages">,
  ) => {
    const toastId = "createPage";

    const workspaceIdToUse = workspaceId ? workspaceId : storedWorkspaceId;
    if (!workspaceIdToUse) {
      toast.error("No workspace found");
      return;
    }
    const pageId = await createPageMutation({
      type: "page",
      workspaceId: workspaceIdToUse,
      parentId: parentId,
    });

    if (pageId) {
      toast.success("Page created", { id: toastId });
      router.push(`/app/${workspaceIdToUse}/${pageId}`);
    }
  };

  const toggleFavoritePage = async (
    pageId: Id<"pages">,
    workspaceId?: Id<"workspaces">,
  ) => {
    const workspaceIdToUse = workspaceId ? workspaceId : storedWorkspaceId;
    const toastId = "toggleFavoritePage";

    if (!workspaceIdToUse) {
      toast.error("No workspace found");
      return;
    }

    toggleFavorite({
      pageId: pageId,
      workspaceId: workspaceIdToUse,
    });

    if (istoggleFavoriteError) {
      toast.error("Something went wrong", { id: toastId });
      console.log(toggleFavoriteError);
    }

    if (toggleFavoritePageId) {
      return toggleFavoritePageId;
    }
  };

  const archivePage = async (pageId: Id<"pages">) => {
    const toastId = "archivePage";

    toggleArchivePage({
      pageId: pageId,
    });

    if (istoggleArchivePending) {
      toast.loading("Moving page to trash...", { id: toastId });
    }

    if (istoggleArchiveError) {
      toast.error("Failed to move page to trash", { id: toastId });
      console.log(toggleArchiveError);
    }

    if (toggleArchivePageId) {
      return toggleArchivePageId;
    }
  };

  const deletePagePermanentlyById = async (pageId: Id<"pages">) => {
    const toastId = "deletePagePermanently";

    deletePagePermanently({
      pageId: pageId,
    });

    if (isDeletePagePermanentlyPending) {
      toast.loading("Deleting page...", { id: toastId });
    }

    if (isDeletePagePermanentlyError) {
      toast.error("Failed to delete page", { id: toastId });
      console.log(deletePagePermanentlyError);
    }

    if (deletedPageId) {
      toast.success("Page deleted", { id: toastId });
      return deletedPageId;
    }
  };

  const renamePageById = async (pageId: Id<"pages">, newName: string) => {
    const toastId = "renamePage";

    renamePage({
      pageId: pageId,
      title: newName,
    });

    if (isRenamePagePending) {
      toast.loading("Renaming page...", { id: toastId });
    }

    if (isRenamePageError) {
      toast.error("Failed to rename page", { id: toastId });
      console.log(renamePageError);
    }

    if (renamedPageId) {
      toast.success("Page renamed", { id: toastId });
      return renamedPageId;
    }
  };

  const usePrivatePagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const {
      data: pages,
      isPending,
      isError,
      error,
    } = useGetPrivatePagesByWorkspaceId(workspaceId);

    return {
      pages,
      isPending,
      isError,
      error,
    };
  };

  const useFavoriteStatus = (pageId: Id<"pages">) => {
    const {
      data: favorite,
      isPending,
      isError,
      error,
    } = useGetFavoriteStatus(pageId);

    return {
      favorite,
      isPending,
      isError,
      error,
    };
  };

  const usePageById = (pageId: Id<"pages">) => {
    const { data: page, isPending, isError, error } = useGetPageById(pageId);

    return {
      page,
      isPending,
      isError,
      error,
    };
  };

  const usePagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const {
      data: pages,
      isPending,
      isError,
      error,
    } = useGetPagesByWorkspaceId(workspaceId);

    return {
      pages,
      isPending,
      isError,
      error,
    };
  };

  const useFavoritePagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const {
      data: pages,
      isPending,
      isError,
      error,
    } = useGetFavoritePagesByWorkspaceId(workspaceId);

    return {
      pages,
      isPending,
      isError,
      error,
    };
  };

  const useSharedPagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const {
      data: pages,
      isPending,
      isError,
      error,
    } = useGetSharedPagesByWorkspaceId(workspaceId);

    return {
      pages,
      isPending,
      isError,
      error,
    };
  };

  const useArchivedPagesByWorkspaceId = (workspaceId?: Id<"workspaces">) => {
    const {
      data: pages,
      isPending,
      isError,
      error,
    } = useGetArchivedPagesByWorkspaceId(workspaceId);

    return {
      pages,
      isPending,
      isError,
      error,
    };
  };

  return {
    createPage,
    storedWorkspaceId,
    usePrivatePagesByWorkspaceId,
    useFavoritePagesByWorkspaceId,
    useSharedPagesByWorkspaceId,
    useArchivedPagesByWorkspaceId,
    toggleFavoritePage,
    archivePage,
    usePageById,
    usePagesByWorkspaceId,
    useFavoriteStatus,
    deletePagePermanentlyById,
    renamePageById,
    // open,
    // setOpen,
    // addPageToDeleted,
    // addPageToFavorites,
    // removePageFromFavorites,
    // user,
    // rename,
    // restorePage,
    // page,
    // isPending,
    // favorite,
    // removePage,
    // renamePage,
    // toggleFavorite
  };
};
