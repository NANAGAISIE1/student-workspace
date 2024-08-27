import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "@convex/api";
import { useMutation } from "@tanstack/react-query";

export const usePageMutations = () => {
  const useCreatePage = () =>
    useMutation({
      mutationFn: useConvexMutation(api.pages.mutation.createPage),
    });

  const useToggleFavorite = () =>
    useMutation({
      mutationFn: useConvexMutation(api.pages.mutation.toggleFavorite),
    });

  const useToggleArchivePage = () =>
    useMutation({
      mutationFn: useConvexMutation(api.pages.mutation.toggleArchivePage),
    });

  const useDeletePagePermanentlyById = () =>
    useMutation({
      mutationFn: useConvexMutation(
        api.pages.mutation.deletePagePermanentlyById,
      ),
    });

  const useRenamePageById = () =>
    useMutation({
      mutationFn: useConvexMutation(api.pages.mutation.renamePageById),
    });

  return {
    useCreatePage,
    useToggleFavorite,
    useToggleArchivePage,
    useDeletePagePermanentlyById,
    useRenamePageById,
  };
};
