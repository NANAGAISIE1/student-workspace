import { Id } from "@convex/dataModel";

export class Site {
  constructor(
    public readonly id: Id<"sites">,
    public readonly creatorId: Id<"users">,
    public readonly pageId: Id<"pages">,
  ) {}
}
