import { Id } from "@convex/dataModel";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

type WorkspaceStore = {
  workspaceId: Id<"workspaces"> | undefined;
  setCurrentWorkspaceId: (workspace: Id<"workspaces"> | undefined) => void;
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

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      workspaceId: undefined, // This will be overwritten by the persisted value if it exists
      setCurrentWorkspaceId: (workspace) => set({ workspaceId: workspace }),
    }),
    {
      name: "workspace-state", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => storage),
    },
  ),
);
