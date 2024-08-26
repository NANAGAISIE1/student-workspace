import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation } from "../_generated/server";
import { ConvexError, v } from "convex/values";

export const createPage = mutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const document = await ctx.db.insert("pages", {
      creatorId: userId,
      workspaceId,
      title: "Untitled",
      updatedAt: Date.now(),
    });

    return document;
  },
});

export const addPageToFavorites = mutation({
  args: {
    pageId: v.id("pages"),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, { pageId, workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    await ctx.db.insert("favoritePages", {
      creatorId: userId,
      pageId,
      workspaceId,
    });

    await ctx.db.patch(pageId, { updatedAt: Date.now() });
    return;
  },
});

export const toggleFavorite = mutation({
  args: {
    pageId: v.id("pages"),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, { pageId, workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const favorite = await ctx.db
      .query("favoritePages")
      .filter((q) =>
        q.and(
          q.eq(q.field("pageId"), pageId),
          q.eq(q.field("creatorId"), userId),
        ),
      )
      .unique();

    if (favorite) {
      await ctx.db.delete(favorite._id);
    } else {
      await ctx.db.insert("favoritePages", {
        creatorId: userId,
        pageId,
        workspaceId,
      });
    }

    await ctx.db.patch(pageId, { updatedAt: Date.now() });
    return;
  },
});

export const removePageFromFavorites = mutation({
  args: {
    pageId: v.id("pages"),
  },
  handler: async (ctx, { pageId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const favoritePage = await ctx.db
      .query("favoritePages")
      .filter((q) => q.eq(q.field("pageId"), pageId))
      .unique();

    if (!favoritePage) return;

    await ctx.db.delete(favoritePage._id);
    await ctx.db.patch(pageId, { updatedAt: Date.now() });

    return;
  },
});

export const moveBackToPagesById = mutation({
  args: {
    pageId: v.id("deletedPages"),
  },
  handler: async (ctx, { pageId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const deletedPage = await ctx.db.get(pageId);

    if (!deletedPage) {
      throw new ConvexError({ message: "Page not found", status: 404 });
    }

    await ctx.db.insert("pages", {
      title: deletedPage.title,
      workspaceId: deletedPage.workspaceId,
      creatorId: deletedPage.creatorId,
      content: deletedPage.content,
      emoji: deletedPage.emoji,
      updatedAt: Date.now(),
    });

    await ctx.db.delete(pageId);

    return;
  },
});

export const deletePagePermanentlyById = mutation({
  args: {
    pageId: v.id("deletedPages"),
  },
  handler: async (ctx, { pageId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const deletedPage = await ctx.db.get(pageId);

    if (!deletedPage) {
      throw new ConvexError({ message: "Page not found", status: 404 });
    }

    await ctx.db.delete(pageId);
    return;
  },
});

export const renamePageById = mutation({
  args: {
    pageId: v.id("pages"),
    title: v.string(),
  },
  handler: async (ctx, { pageId, title }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    await ctx.db.patch(pageId, { title, updatedAt: Date.now() });

    return;
  },
});

export const addPageToDeleted = mutation({
  args: {
    pageId: v.id("pages"),
  },
  handler: async (ctx, { pageId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const page = await ctx.db.get(pageId);

    if (!page) {
      throw new ConvexError({ message: "Page not found", status: 404 });
    }

    const deleted = await ctx.db.insert("deletedPages", {
      title: page.title,
      workspaceId: page.workspaceId,
      creatorId: page.creatorId,
      content: page.content,
      emoji: page.emoji,
      updatedAt: Date.now(),
    });

    await ctx.db.delete(pageId);

    return deleted;
  },
});
