import { Id } from "@convex/dataModel";

export class Page {
  constructor(
    public readonly id: Id<"pages">,
    public readonly title: string,
    public readonly workspaceId: Id<"workspaces">,
    public readonly creatorId: Id<"users">,
    public readonly updatedAt: number,
    public readonly content?: string,
    public readonly emoji?: string,
    public readonly type?: "page" | "todo" | "calendar",
    public readonly parentId?: Id<"pages">,
    public readonly lastEditedBy?: Id<"users">,
    public readonly archived?: boolean,
  ) {}
}

export class SharedPage {
  constructor(
    public readonly id: Id<"sharedPages">,
    public readonly pageId: Id<"pages">,
    public readonly creatorId: Id<"users">,
    public readonly workspaceId: Id<"workspaces">,
  ) {}
}

export class FavoritePage {
  constructor(
    public readonly id: Id<"favoritePages">,
    public readonly pageId: Id<"pages">,
    public readonly creatorId: Id<"users">,
    public readonly workspaceId: Id<"workspaces">,
  ) {}
}
