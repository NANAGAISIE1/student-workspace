import { mutation } from "../_generated/server";
import { auth } from "../auth";
import { ConvexError, v } from "convex/values";

export const createDocument = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (userId === null) {
      return null;
    }
    const document = await ctx.db.insert("documents", {
      title: "Untitled",
      userId,
    });

    return document;
  },
});

export const removeDocument = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, { id }) => {
    const userId = await auth.getUserId(ctx);
    if (userId === null) {
      return null;
    }
    try {
      const document = await ctx.db.get(id);

      if (document?.userId !== userId) {
        await ctx.db.delete(id);
        return null;
      }
    } catch (error) {
      throw new ConvexError({ message: "Document not found", status: 404 });
    }
  },
});

export const updateDocument = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, { id, title, content }) => {
    const userId = await auth.getUserId(ctx);
    if (userId === null) {
      return null;
    }
    try {
      const document = await ctx.db.get(id);

      if (document?.userId !== userId) {
        await ctx.db.patch(id, { title, content });
        return null;
      }
    } catch (error) {
      throw new ConvexError({ message: "Document not found", status: 404 });
    }
  },
});
