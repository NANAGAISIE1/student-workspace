import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";

export const getPageById = query({
  args: {
    pageId: v.id("pages"),
  },
  handler: async (ctx, { pageId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const page = await ctx.db.get(pageId);

    return page;
  },
});

export const getPagesByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const allPages = await ctx.db
      .query("pages")
      .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
      .collect();

    return allPages;
  },
});

export const getPrivatePagesByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const allPages = await ctx.db
      .query("pages")
      .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
      .collect();

    return allPages;
  },
});

export const getSharedPagesByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const sharedPages = await ctx.db
      .query("sharedPages")
      .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
      .collect();

    const unFlatenedPages = asyncMap(sharedPages, async (page) => {
      const pages = await ctx.db.get(page.pageId);
      return pages;
    });

    const allPages = (await unFlatenedPages).flat();

    return allPages;
  },
});

export const getFavoritePagesByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const favoritePages = await ctx.db
      .query("favoritePages")
      .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
      .collect();

    const unFlatenedPages = asyncMap(favoritePages, async (page) => {
      const pages = await ctx.db.get(page.pageId);
      return pages;
    });

    const allPages = (await unFlatenedPages).flat();

    return allPages;
  },
});

export const getFavoriteStatus = query({
  args: {
    pageId: v.id("pages"),
  },
  handler: async (ctx, { pageId }) => {
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

    return favorite ? true : false;
  },
});

export const getDeletedPageInTrashByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const deletedPages = await ctx.db
      .query("deletedPages")
      .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
      .collect();

    return deletedPages;
  },
});
