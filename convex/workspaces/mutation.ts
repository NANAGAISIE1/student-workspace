import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createWorkspace = mutation({
  args: {
    name: v.string(),
    type: v.union(v.literal("personal"), v.literal("organization")),
    organizationId: v.optional(v.id("organizations")),
    members: v.optional(v.array(v.id("users"))),
  },
  handler: async (ctx, { name, type, organizationId, members }) => {
    // const userId = await getAuthUserId(ctx);
    // if (userId === null) {
    //   return null;
    // }
    // const newMembers =
    //   members?.flatMap((member) => {
    //     return [member, userId];
    //   }) || [];
    // return void (await ctx.db.insert("workspaces", {
    //   name,
    //   type,
    //   ownerId: userId,
    //   organizationId,
    //   members: newMembers, // Owner is added as the first member
    //   updatedAt: Date.now(),
    // }));
  },
});
