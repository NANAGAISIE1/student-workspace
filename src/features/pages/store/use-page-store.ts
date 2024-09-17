import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

type PageStore = {
  isPageDropdownOpen: boolean;
  togglePageDropdown: () => void;
  ensureOpen: () => void;
};

const storage: StateStorage = {
  getItem: (name: string): string | null => {
    try {
      const str = localStorage.getItem(name);
      return str ? JSON.parse(str) : null;
    } catch (error) {
      console.error(`Error retrieving ${name} from localStorage:`, error);
      return null;
    }
  },
  setItem: (name: string, value: unknown): void => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${name} in localStorage:`, error);
    }
  },
  removeItem: (name: string): void => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error(`Error removing ${name} from localStorage:`, error);
    }
  },
};

const getUniqueName = (): string => {
  if (typeof window !== "undefined") {
    return `page-drop-down-state-${window.location.pathname}`;
  }
  return "page-drop-down-state-default";
};

export const usePageStore = create<PageStore>()(
  persist(
    (set) => ({
      isPageDropdownOpen: true,
      togglePageDropdown: () =>
        set((state) => ({ isPageDropdownOpen: !state.isPageDropdownOpen })),
      ensureOpen: () => set({ isPageDropdownOpen: true }),
    }),
    {
      name: getUniqueName(),
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({ isPageDropdownOpen: state.isPageDropdownOpen }),
    },
  ),
);
