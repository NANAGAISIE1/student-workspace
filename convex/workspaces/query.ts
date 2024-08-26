import { v } from "convex/values";
import { query, QueryCtx } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";

export const getWorkspaceById = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    // const userId = await getAuthUserId(ctx);
    // if (userId === null) {
    //   return null;
    // }
    // const workspace = await ctx.db.get(workspaceId);
    // if (!workspace) {
    //   throw new ConvexError({ message: "Document not found", status: 404 });
    // }
    // if (workspace.ownerId !== userId && !workspace.members?.includes(userId)) {
    //   throw new ConvexError({ message: "Unauthorized", status: 403 });
    // }
    // return workspace;
  },
});

export const getPersonalWorkspacesByUserId = query({
  handler: async (ctx) => {
    // const userId = await getAuthUserId(ctx);
    // if (userId === null) {
    //   return null;
    // }
    // const workspaces = await ctx.db
    //   .query("workspaces")
    //   .filter((q) =>
    //     q.and(
    //       q.eq(q.field("ownerId"), userId),
    //       q.eq(q.field("type"), "personal"),
    //     ),
    //   )
    //   .collect();
    // return workspaces;
  },
});

export const getOrganizationalWorkspacesByUserId = query({
  handler: async (ctx) => {
    // const userId = await getAuthUserId(ctx);
    // if (userId === null) {
    //   return null;
    // }
    // const workspaces = await ctx.db
    //   .query("workspaces")
    //   .filter((q) => q.field("members"))
    //   .collect();
    // return workspaces;
  },
});

export const getAllUserWorkspaces = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    // Get personal workspaces owned by the user
    const personalWorkspaces = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("ownerId"), userId))
      .collect();

    // Get shared workspaces associated with those organizations
    const sharedWorkspace = await getOrganizationalWorkspaces(ctx);

    if (!sharedWorkspace) {
      return { personal: personalWorkspaces, shared: [] };
    }

    // Collect IDs of shared workspaces
    const sharedWorkspaceIds = new Set(
      sharedWorkspace.flat().map((workspace) => workspace._id),
    );

    // Filter out personal workspaces that are also in shared workspaces
    const filteredPersonalWorkspaces = personalWorkspaces.filter(
      (workspace) => !sharedWorkspaceIds.has(workspace._id),
    );

    return {
      personal: filteredPersonalWorkspaces,
      shared: sharedWorkspace.flat(),
    };
  },
});

async function getOrganizationalWorkspaces(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    return;
  }
  const userOrganizations = await ctx.db
    .query("userOrganizations")
    .filter((q) => q.eq(q.field("userId"), userId))
    .collect();

  return asyncMap(userOrganizations, async (org) => {
    const organizationalWorkspace = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("organizationId"), org.organizationId))
      .collect();

    return organizationalWorkspace;
  });
}

export const getMostCurrentWordspace = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    // Get the most recently updated workspace a user has access to
    // Check for organizational workspaces
    // Check for personal workspaces
    // Return the most recently updated workspace

    const organizationalWorkspaces = await getOrganizationalWorkspaces(ctx);

    const personalWorkspace = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("ownerId"), userId))
      .first();

    if (!organizationalWorkspaces) {
      return;
    }

    if (!personalWorkspace) {
      return;
    }

    const sharedWorkspaces = organizationalWorkspaces.flat();

    const sharedWorkspace = sharedWorkspaces.reduce((acc, workspace) => {
      if (workspace.updatedAt > acc.updatedAt) {
        return workspace;
      }
      return acc;
    });

    if (personalWorkspace.updatedAt > sharedWorkspace.updatedAt) {
      return personalWorkspace._id;
    } else {
      return sharedWorkspace._id;
    }
  },
});
