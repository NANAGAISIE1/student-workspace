import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

type PageStore = {
  isPageDropdownOpen: boolean;
  togglePageDropdown: () => void;
  ensureOpen: () => void;
};

const storage: StateStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name: string, value: unknown) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

export const usePageStore = create<PageStore>()(
  persist(
    (set) => ({
      isPageDropdownOpen: true, // This will be overwritten by the persisted value if it exists
      togglePageDropdown: () =>
        set((state) => ({ isPageDropdownOpen: !state.isPageDropdownOpen })),
      ensureOpen: () => set({ isPageDropdownOpen: true }),
    }),
    {
      name: "page-drop-down-state", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => storage),
    },
  ),
);
