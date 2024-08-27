import { useRouter } from "next/navigation";
import { usePageMutations } from "../api/mutations";
import { Id } from "@convex/dataModel";
import { toast } from "sonner";
import { useWorkspaceStore } from "@/features/workspaces/store/workspace-store";
import { usePageQueries } from "../api/query";
import { useWorkspaceQuery } from "@/features/workspaces/api/query";

export const usePage = () => {
  const router = useRouter();
  // const [open, setOpen] = useState(false);
  const { workspaceId: storedWorkspaceId, setCurrentWorkspaceId } =
    useWorkspaceStore((state) => state);
  const { useGetMostCurrentWorkspace } = useWorkspaceQuery();
  const { useGetPrivatePagesByWorkspaceId } = usePageQueries();
  const { useToggleArchivePage, useToggleFavorite, useCreatePage } =
    usePageMutations();
  const {
    mutate: createPageMutaion,
    data: pageId,
    isPending: createPageIsPending,
    isError: createPageIsError,
    error: createPageError,
  } = useCreatePage();

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

  const createPage = async ({
    workspaceId,
    parentId,
  }: {
    workspaceId?: Id<"workspaces">;
    parentId?: Id<"pages">;
  }) => {
    const toastId = "createPage";

    const workspaceIdToUse = workspaceId ? workspaceId : storedWorkspaceId;
    if (!workspaceIdToUse) {
      toast.error("No workspace found");
      return;
    }
    createPageMutaion({
      type: "page",
      workspaceId: workspaceIdToUse,
      parentId: parentId,
    });

    if (createPageIsPending) {
      toast.loading("Creating page...", { id: toastId });
    }

    if (createPageIsError) {
      toast.error("Failed to create page", { id: toastId });
      console.log(createPageError);
    }

    if (pageId) {
      toast.success("Page created", { id: toastId });
      router.push(`/app/${workspaceId}/${pageId}`);
      return pageId;
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

  // const removePageFromFavorites = useMutation(
  //     api.pages.mutation.removePageFromFavorites,
  // );
  // const { data: user } = useQueryWithStatus(api.user.query.getCurrentUser, {});
  // const rename = useMutation(api.pages.mutation.renamePageById);
  // const restorePage = useMutation(api.pages.mutation.moveBackToPagesById);
  // const { data: page, isPending } = useQueryWithStatus(
  //     api.pages.query.getPageById,
  //     {
  //     pageId: nodeId as Id<"pages">,
  //     },
  // );
  // const { data: favorite } = useQueryWithStatus(
  //     api.pages.query.getFavoriteStatus,
  //     {
  //     pageId: nodeId as Id<"pages">,
  //     },
  // );

  // const removePage = async () => {
  //     const deletedPageId = await addPageToDeleted({
  //     pageId: nodeId as Id<"pages">,
  //     });

  //     if (!deletedPageId) {
  //     toast.warning("Failed to move page to trash");
  //     return;
  //     }

  //     toast.warning("Page moved to trash", {
  //     action: {
  //         label: "Undo",
  //         onClick: async () => await restorePage({ pageId: deletedPageId }),
  //     },
  //     });
  //     router.push(`/app/${workspaceId}`);
  //     setOpen(false);
  // };

  // const renamePage = async (newName: string) => {
  //     await rename({
  //     pageId: nodeId as Id<"pages">,
  //     title: newName,
  //     });
  // };

  // const toggleFavorite = async () => {
  //     if (favorite) {
  //     await removePageFromFavorites({ pageId: nodeId as Id<"pages"> });
  //     } else {
  //     await addPageToFavorites({
  //         pageId: nodeId as Id<"pages">,
  //     });
  //     }
  // };

  return {
    createPage,
    storedWorkspaceId,
    usePrivatePagesByWorkspaceId,
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
