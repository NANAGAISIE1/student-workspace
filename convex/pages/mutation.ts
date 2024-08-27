import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import {
  isAdmin,
  recursiveArchive,
  recursiveDeletion,
  recursiveFavorite,
} from "./helpers";

export const createPage = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    parentId: v.optional(v.id("pages")),
    type: v.union(v.literal("page"), v.literal("todo"), v.literal("calendar")),
  },
  handler: async (ctx, { workspaceId, parentId, type }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const ownerId = await ctx.db
      .query("workspaces")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", userId))
      .unique();

    if (!ownerId) {
      throw new ConvexError({
        message: "You do not own this workspace",
        status: 401,
      });
    }

    const newPageId = await ctx.db.insert("pages", {
      creatorId: userId,
      workspaceId,
      title: "Untitled",
      updatedAt: Date.now(),
      parentId,
      archived: false,
      lastEditedBy: userId,
      type,
    });

    return newPageId;
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

    await recursiveFavorite(ctx, pageId, userId, workspaceId);
    return;
  },
});

export const toggleArchivePage = mutation({
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

    const admin = await isAdmin(ctx, page.workspaceId);

    if (!admin) {
      throw new ConvexError({
        message: "You do not have permission to archive this page",
        status: 401,
      });
    }

    if (page.archived) {
      await recursiveArchive(ctx, pageId, userId, false);
    } else {
      await recursiveArchive(ctx, pageId, userId, true);
    }
    return pageId;
  },
});

export const deletePagePermanentlyById = mutation({
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

    const admin = await isAdmin(ctx, page.workspaceId);

    if (!admin) {
      throw new ConvexError({
        message: "You do not have permission to delte this page",
        status: 401,
      });
    }

    await recursiveDeletion(ctx, pageId, userId);

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

    const page = await ctx.db.get(pageId);

    if (!page) {
      throw new ConvexError({ message: "Page not found", status: 404 });
    }

    const admin = await isAdmin(ctx, page.workspaceId);

    if (!admin) {
      throw new ConvexError({
        message: "You do not have permission to rename this page",
        status: 401,
      });
    }

    await ctx.db.patch(pageId, {
      title,
      updatedAt: Date.now(),
      lastEditedBy: userId,
    });

    return;
  },
});
