import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, MutationCtx } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "../_generated/dataModel";
import { createWorkspace } from "../workspaces/mutation";
import { pageTemplates } from "./constants";

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

    const gettingStartedPage = await ctx.db
      .query("pageTemplates")
      .filter((q) => q.eq(q.field("type"), "gettingStarted"))
      .unique();

    if (gettingStartedPage === null) {
      return null;
    }

    const gettingStartedPageId = await ctx.db.insert("pages", {
      title: gettingStartedPage.title,
      workspaceId,
      creatorId: userId,
      content: gettingStartedPage.content,
      emoji: gettingStartedPage.emoji,
      updatedAt: Date.now(),
      type: gettingStartedPage.pageType,
      archived: false,
      lastEditedBy: userId,
    });

    if (gettingStartedPageId === undefined) {
      return null;
    }

    return {
      workspaceId,
      gettingStartedPageId,
    };
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

  const templates = await Promise.all(
    interests.map(async (interest) => {
      const template = await ctx.db
        .query("pageTemplates")
        .filter((q) => q.eq(q.field("type"), interest))
        .first();

      if (template === null) {
        return;
      }

      return template;
    }),
  );

  await Promise.all(
    templates.map(async (template) => {
      if (template === undefined) {
        return;
      }

      const pageId = await ctx.db.insert("pages", {
        title: template.title,
        workspaceId,
        creatorId: userId,
        content: template.content,
        emoji: template.emoji,
        updatedAt: Date.now(),
        type: template.pageType,
        archived: false,
        lastEditedBy: userId,
      });

      return pageId;
    }),
  );
}

export const uploadPageTemplate = internalMutation({
  args: {},
  handler: async (ctx) => {
    const templates = pageTemplates;

    await Promise.all(
      templates.map(async (template) => {
        const pageId = await ctx.db.insert("pageTemplates", {
          title: template.title,
          content: template.content,
          pageType: template.pageType,
          emoji: template.emoji,
          type: template.type,
        });

        return pageId;
      }),
    );
  },
});
