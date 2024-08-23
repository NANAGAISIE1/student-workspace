import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getDocument = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const document = await ctx.db.get(id);
    if (document?.userId !== userId) {
      return null;
    }
    return document;
  },
});

export const getDocuments = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});
