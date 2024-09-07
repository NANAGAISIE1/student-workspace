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

export const getMostCurrentWorkspace = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const members = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    if (members.length === 0) {
      return null;
    }

    // Sort workspaces by last updated time
    const workspaces = await Promise.all(
      members.map(async (member) => {
        const workspace = await ctx.db.get(member.workspaceId);
        return workspace;
      }),
    );

    const sortedWorkspaces = workspaces
      .filter((w): w is NonNullable<typeof w> => w !== null)
      .sort((a, b) => b.updatedAt - a.updatedAt);

    return sortedWorkspaces[0] || null;
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
