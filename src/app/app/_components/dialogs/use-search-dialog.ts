import { create } from "zustand";

type SearchStore = {
  isSearchDialogOpen: boolean;
  toggleSearchDialog: () => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
  isSearchDialogOpen: false,
  toggleSearchDialog: () =>
    set((state) => ({ isSearchDialogOpen: !state.isSearchDialogOpen })),
}));
