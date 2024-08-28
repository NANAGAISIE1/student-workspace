import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { isMember } from "./helpers";

export const getPageById = query({
  args: {
    pageId: v.id("pages"),
  },
  handler: async (ctx, { pageId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return;
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
      return;
    }

    const member = await isMember(ctx, workspaceId);

    if (!member) {
      return;
    }

    const allPages = await ctx.db
      .query("pages")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .filter((q) => q.eq(q.field("archived"), false))
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

    const member = await isMember(ctx, workspaceId);

    if (!member) {
      return;
    }

    const allPages = await ctx.db
      .query("pages")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .filter((q) => q.eq(q.field("archived"), false))
      .collect();

    const privatePage = [];
    for (const page of allPages) {
      const sharedPage = await ctx.db
        .query("sharedPages")
        .filter((q) => q.eq(q.field("pageId"), page._id))
        .unique();

      if (!sharedPage) {
        privatePage.push(page);
      }
    }

    return privatePage;
  },
});

export const getSharedPagesByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const member = await isMember(ctx, workspaceId);

    if (!member) {
      return;
    }

    const sharedPages = await ctx.db
      .query("sharedPages")
      .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
      .collect();

    const pages = [];

    for (const page of sharedPages) {
      const sharedPage = await ctx.db.get(page.pageId);
      if (sharedPage) {
        pages.push(sharedPage);
      }
    }

    if (pages.length === 0) {
      return null;
    }

    return pages;
  },
});

export const getFavoritePagesByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const member = await isMember(ctx, workspaceId);

    if (!member) {
      return;
    }

    const favoritePages = await ctx.db
      .query("favoritePages")
      .filter((q) =>
        q.and(
          q.eq(q.field("creatorId"), userId),
          q.eq(q.field("workspaceId"), workspaceId),
        ),
      )
      .collect();

    const pageIds = favoritePages.map((fp) => fp.pageId);

    const pages = await ctx.db
      .query("pages")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), workspaceId),
          q.or(
            q.eq(q.field("archived"), false),
            q.eq(q.field("archived"), undefined),
          ),
        ),
      )
      .collect();

    return pages.filter((page) => pageIds.includes(page._id));
  },
});

export const getFavoriteStatus = query({
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
          q.eq(q.field("workspaceId"), workspaceId),
        ),
      )
      .unique();

    return favorite !== null;
  },
});

export const getArchivedPagesByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const member = await isMember(ctx, workspaceId);

    if (!member) {
      return;
    }

    const archivedPages = await ctx.db
      .query("pages")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), workspaceId),
          q.eq(q.field("archived"), true),
        ),
      )
      .collect();

    return archivedPages;
  },
});

export const getPagesByParentPage = query({
  args: {
    parentPageId: v.optional(v.id("pages")),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, { parentPageId, workspaceId }) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const member = await isMember(ctx, workspaceId);

    if (!member) {
      return;
    }

    const pages = await ctx.db
      .query("pages")
      .withIndex("by_workspace_id_parent_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("parentId", parentPageId),
      )
      .filter((q) => q.eq(q.field("archived"), false))
      .order("desc")
      .collect();

    return pages;
  },
});

export const searchPagesInWorkspace = query({
  args: {
    workspaceId: v.id("workspaces"),
    query: v.string(),
  },
  handler: async (ctx, { workspaceId, query }) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const member = await isMember(ctx, workspaceId);

    if (!member) {
      return;
    }

    const allPages = await ctx.db
      .query("pages")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), workspaceId),
          q.eq(q.field("archived"), false),
        ),
      )
      .order("desc")
      .collect();

    // // Perform searches on title, content, and emoji separately
    // const searchResultsTitle = await ctx.db
    //   .query("pages")
    //   .withSearchIndex("search_title", (q) => q.search("title", query))
    //   .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
    //   .collect();

    // const searchResultsContent = await ctx.db
    //   .query("pages")
    //   .withSearchIndex("search_content", (q) => q.search("content", query))
    //   .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
    //   .collect();

    // const searchResultsEmoji = await ctx.db
    //   .query("pages")
    //   .withSearchIndex("search_emoji", (q) => q.search("emoji", query))
    //   .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
    //   .collect();

    // // Combine and deduplicate results
    // const combinedResults = [
    //   ...emptyQueryPages,
    //   ...searchResultsTitle,
    //   ...searchResultsContent,
    //   ...searchResultsEmoji,
    // ];

    // const uniqueResults = Array.from(
    //   new Map(combinedResults.map((item) => [item._id, item])).values(),
    // );

    // // Sort results (you may want to implement a relevance scoring system here)
    // const sortedResults = uniqueResults.sort(
    //   (a, b) => b._creationTime - a._creationTime,
    // );

    // console.log("searching in content", workspaceId, searchResultsContent);

    // // Return top 10 results
    // return sortedResults.slice(0, 10);
    return allPages;
  },
});
