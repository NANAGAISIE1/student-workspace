import { FavoritePage, Page, SharedPage } from "@/core/domain/entities/page";
import { Id } from "@convex/dataModel";

export interface PageRepository {
  getPageById(id: Id<"pages">): Promise<Page | null>;
  getPagesByWorkspaceId(workspaceId: Id<"workspaces">): Promise<Page[]>;
  createPage(page: Omit<Page, "id">): Promise<Page>;
  updatePage(page: Page): Promise<Page>;
  deletePage(id: Id<"pages">): Promise<void>;
}

export interface SharedPageRepository {
  getSharedPagesByCreatorId(creatorId: Id<"users">): Promise<SharedPage[]>;
  getSharedPagesByWorkspaceId(
    workspaceId: Id<"workspaces">,
  ): Promise<SharedPage[]>;
  sharePagedPage(sharedPage: Omit<SharedPage, "id">): Promise<SharedPage>;
  unsharePagedPage(id: Id<"sharedPages">): Promise<void>;
}

export interface FavoritePageRepository {
  getFavoritePagesByCreatorId(creatorId: Id<"users">): Promise<FavoritePage[]>;
  getFavoritePagesByWorkspaceId(
    workspaceId: Id<"workspaces">,
  ): Promise<FavoritePage[]>;
  addFavoritePage(
    favoritePage: Omit<FavoritePage, "id">,
  ): Promise<FavoritePage>;
  removeFavoritePage(id: Id<"favoritePages">): Promise<void>;
}
