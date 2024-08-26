import { v } from "convex/values";
import { mutation, MutationCtx } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "../_generated/dataModel";
import { gettingStartedTemplate, interestsTemplates } from "./constants";
import { asyncMap } from "modern-async";

export const onboarding = mutation({
  args: {
    orgtype: v.union(
      v.literal("college"),
      v.literal("team"),
      v.literal("personal"),
    ),
    interests: v.array(
      v.union(v.literal("notes"), v.literal("research"), v.literal("site")),
    ),
    members: v.optional(v.array(v.id("users"))),
  },
  handler: async (ctx, { orgtype, interests, members }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user === null) {
      return null;
    }

    const createOrg = await ctx.db.insert("organizations", {
      name: `${orgtype.charAt(0).toUpperCase() + orgtype.slice(1)}`,
      type: orgtype,
      ownerId: userId,
      updatedAt: Date.now(),
      members: members,
    });

    if (orgtype !== "personal") {
      await ctx.db.insert("userOrganizations", {
        userId,
        organizationId: createOrg,
        role: "admin",
      });
    }

    const createWorkspace = await ctx.db.insert("workspaces", {
      name: `${orgtype.charAt(0).toUpperCase() + orgtype.slice(1)}`,
      ownerId: userId,
      organizationId: createOrg,
      updatedAt: Date.now(),
    });
    void (await uploadPages(ctx, createWorkspace, interests));

    return createWorkspace;
  },
});

async function uploadPages(
  ctx: MutationCtx,
  workspaceId: Id<"workspaces">,
  interests: ("notes" | "research" | "site")[],
) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    return;
  }

  const templates = interests.map((interest) => interestsTemplates[interest]);
  const combinedTemplates = [...templates, gettingStartedTemplate];

  return asyncMap(combinedTemplates, async (template) => {
    await ctx.db.insert("pages", {
      title: template.title,
      workspaceId,
      creatorId: userId,
      content: template.content,
      emoji: template.emoji,
      updatedAt: Date.now(),
    });
  });
}
