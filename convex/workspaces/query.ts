import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getWorkspaceById = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const member = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId),
      )
      .unique();

    if (!member) {
      return null;
    }

    return workspaceId;
  },
});

export const getWorkspaces = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const members = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    const workspaceIds = members.map((member) => member.workspaceId);

    const workspaces = [];

    for (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId);
      const membersInWorkspace = await ctx.db
        .query("workspaceMembers")
        .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
        .collect();
      if (workspace && workspace.archived === false) {
        const workspaceWithMembers = {
          ...workspace,
          members: membersInWorkspace.length,
        };
        workspaces.push(workspaceWithMembers);
      }
    }

    return workspaces;
  },
});

export const getMostCurrentWordspace = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const member = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    if (!member) {
      return null;
    }

    const workspace = await ctx.db.get(member.workspaceId);

    return workspace;
  },
});

export const getWorkspaceMembers = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const members = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
      .collect();

    return members;
  },
});
