import { Doc, Id } from "@convex/dataModel";

export type PageItemProps = {
  node: Doc<"pages">;
  level: number;
  allPages: Doc<"pages">[];
  workspaceId: Id<"workspaces">;
  isFavoriteSection?: boolean;
};
