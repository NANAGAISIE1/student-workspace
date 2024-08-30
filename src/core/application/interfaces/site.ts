import { Doc, Id } from "@convex/dataModel";

export interface SiteRepository {
  getSiteByPageId(pageId: Id<"pages">): Promise<Doc<"sites"> | null>;
  getSitesByCreatorId(creatorId: Id<"users">): Promise<Doc<"sites">[]>;
  createSite(site: Omit<Doc<"sites">, "_id">): Promise<Doc<"sites">>;
  deleteSite(id: Id<"sites">): Promise<void>;
}
