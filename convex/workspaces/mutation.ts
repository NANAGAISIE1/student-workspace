import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { asyncMap } from "convex-helpers";

export const createWorkspace = mutation({
  args: {
    members: v.optional(v.array(v.id("users"))),
    name: v.string(),
    ownerId: v.id("users"),
  },
  handler: async (ctx, { name, members, ownerId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new ConvexError({ message: "User not authenticated", status: 401 });
    }

    const workspaceId = await ctx.db.insert("workspaces", {
      name,
      ownerId: userId,
      updatedAt: Date.now(),
      archived: false,
      updatedBy: userId,
      plan: "free",
    });

    await ctx.db.insert("workspaceMembers", {
      workspaceId: workspaceId,
      userId: ownerId,
      role: "admin",
    });

    if (members) {
      asyncMap(members, async (member) => {
        await ctx.db.insert("workspaceMembers", {
          workspaceId: workspaceId,
          userId: member,
          role: "member",
        });
      });
    }

    return workspaceId;
  },
});
