import { Doc, Id } from "@convex/dataModel";

export interface PageRepository {
  getPageById(id: Id<"pages">): Promise<Doc<"pages"> | null>;
  getPagesByWorkspaceId(workspaceId: Id<"workspaces">): Promise<Doc<"pages">>;
  createPage(page: Omit<Doc<"pages">, "_id">): Promise<Id<"pages">>;
  updatePage(page: Doc<"pages">): Promise<Id<"pages">>;
  deletePage(id: Id<"pages">): Promise<void>;
}

export interface SharedPageRepository {
  getSharedPagesByCreatorId(
    creatorId: Id<"users">,
  ): Promise<Doc<"sharedPages">[]>;
  getSharedPagesByWorkspaceId(
    workspaceId: Id<"workspaces">,
  ): Promise<Doc<"sharedPages">[]>;
  sharePagedPage(
    sharedPage: Omit<Doc<"sharedPages">, "_id">,
  ): Promise<Doc<"sharedPages">>;
  unsharePagedPage(id: Id<"sharedPages">): Promise<void>;
}

export interface FavoritePageRepository {
  getFavoritePagesByCreatorId(
    creatorId: Id<"users">,
  ): Promise<Doc<"favoritePages">[]>;
  getFavoritePagesByWorkspaceId(
    workspaceId: Id<"workspaces">,
  ): Promise<Doc<"favoritePages">[]>;
  addFavoritePage(
    favoritePage: Omit<Doc<"favoritePages">, "_id">,
  ): Promise<Doc<"favoritePages">>;
  removeFavoritePage(id: Id<"favoritePages">): Promise<void>;
}
