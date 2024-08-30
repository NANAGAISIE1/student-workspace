import { Site } from "@/core/domain/entities/site";
import { Id } from "@convex/dataModel";

export interface SiteRepository {
  getSiteByPageId(pageId: Id<"pages">): Promise<Site | null>;
  getSitesByCreatorId(creatorId: Id<"users">): Promise<Site[]>;
  createSite(site: Omit<Site, "id">): Promise<Site>;
  deleteSite(id: Id<"sites">): Promise<void>;
}
