import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

type SidebarStore = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
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

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isSidebarOpen: true, // This will be overwritten by the persisted value if it exists
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      ensureOpen: () => set({ isSidebarOpen: true }),
    }),
    {
      name: "sidebar-state", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => storage),
    },
  ),
);
