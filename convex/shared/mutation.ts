import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "../_generated/dataModel";
import { gettingStartedTemplate, interestsTemplates } from "./constants";
import { asyncMap } from "modern-async";
import { createWorkspace } from "../workspaces/mutation";

export const onboarding = mutation({
  args: {
    workspaceType: v.union(
      v.literal("college"),
      v.literal("team"),
      v.literal("personal"),
    ),
    interests: v.array(
      v.union(v.literal("notes"), v.literal("research"), v.literal("site")),
    ),
    members: v.optional(v.array(v.id("users"))),
  },
  handler: async (ctx, { workspaceType, interests, members }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user === null) {
      throw new ConvexError({ message: "User not found", status: 404 });
    }

    const capitalizeFirstLetter = (string: string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    const workspaceId = await createWorkspace(ctx, {
      members: members,
      name: capitalizeFirstLetter(workspaceType),
      ownerId: userId,
    });

    await uploadPages(ctx, workspaceId, interests);

    return workspaceId;
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
      type: template.type,
      archived: false,
      lastEditedBy: userId,
    });
  });
}
