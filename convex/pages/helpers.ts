import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";

export async function isAdmin(
  ctx: MutationCtx | QueryCtx,
  workspaceId: Id<"workspaces">,
) {
  const userId = await getAuthUserId(ctx);

  const workspaceAdmin = await ctx.db
    .query("workspaceMembers")
    .filter((q) =>
      q.and(
        q.eq(q.field("userId"), userId),
        q.eq(q.field("role"), "admin"),
        q.eq(q.field("workspaceId"), workspaceId),
      ),
    )
    .unique();

  if (workspaceAdmin) {
    return true;
  } else {
    return false;
  }
}

export async function isMember(
  ctx: MutationCtx | QueryCtx,
  workspaceId: Id<"workspaces">,
) {
  const userId = await getAuthUserId(ctx);

  const workspaceMember = await ctx.db
    .query("workspaceMembers")
    .filter((q) =>
      q.and(
        q.eq(q.field("userId"), userId),
        q.eq(q.field("workspaceId"), workspaceId),
      ),
    )
    .unique();

  if (workspaceMember) {
    return true;
  } else {
    return false;
  }
}

export const recursiveArchive = async (
  ctx: MutationCtx,
  pageId: Id<"pages">,
  userId: Id<"users">,
  archive: boolean,
) => {
  const recursiveArchive = async (pageId: Id<"pages">) => {
    const children = await ctx.db
      .query("pages")
      .filter((q) => q.eq(q.field("parentId"), pageId))
      .collect();

    for (const child of children) {
      await ctx.db.patch(child._id, {
        archived: archive,
        updatedAt: Date.now(),
        lastEditedBy: userId,
      });

      await recursiveArchive(child._id);
    }
  };

  await ctx.db.patch(pageId, {
    archived: archive,
  });

  recursiveArchive(pageId);

  return;
};

export const recursiveDeletion = async (
  ctx: MutationCtx,
  pageId: Id<"pages">,
  userId: Id<"users">,
) => {
  const recursiveDeletion = async (pageId: Id<"pages">) => {
    const children = await ctx.db
      .query("pages")
      .filter((q) => q.eq(q.field("parentId"), pageId))
      .collect();

    for (const child of children) {
      await recursiveDeletion(child._id);
    }

    await ctx.db.delete(pageId);
  };

  await recursiveDeletion(pageId);

  return;
};

export async function toggleSingleFavorite(
  ctx: MutationCtx,
  pageId: Id<"pages">,
  userId: Id<"users">,
  workspaceId: Id<"workspaces">,
) {
  const favorite = await ctx.db
    .query("favoritePages")
    .filter((q) =>
      q.and(
        q.eq(q.field("pageId"), pageId),
        q.eq(q.field("workspaceId"), workspaceId),
      ),
    )
    .unique();

  if (favorite) {
    await ctx.db.delete(favorite._id);
  } else {
    await ctx.db.insert("favoritePages", {
      creatorId: userId,
      pageId,
      workspaceId,
    });
  }

  await ctx.db.patch(pageId, {
    updatedAt: Date.now(),
    lastEditedBy: userId,
  });
}

export const recursiveToggleFavorite = async (
  ctx: MutationCtx,
  pageId: Id<"pages">,
  userId: Id<"users">,
  workspaceId: Id<"workspaces">,
) => {
  // First, toggle the favorite status of the current page
  await toggleFavoriteStatus(ctx, pageId, userId, workspaceId);

  // Then, get all child pages and recursively toggle their favorite status
  const childPages = await ctx.db
    .query("pages")
    .withIndex("by_parent", (q) => q.eq("parentId", pageId))
    .collect();

  // Recursively toggle favorite status for all child pages
  for (const childPage of childPages) {
    await recursiveToggleFavorite(ctx, childPage._id, userId, workspaceId);
  }
};

const toggleFavoriteStatus = async (
  ctx: MutationCtx,
  pageId: Id<"pages">,
  userId: Id<"users">,
  workspaceId: Id<"workspaces">,
) => {
  // Check if the page is already a favorite
  const existingFavorite = await ctx.db
    .query("favoritePages")
    .filter((q) =>
      q.and(
        q.eq(q.field("pageId"), pageId),
        q.eq(q.field("workspaceId"), workspaceId),
      ),
    )
    .unique();

  if (existingFavorite) {
    // If it is already a favorite, remove it
    await ctx.db.delete(existingFavorite._id);
  } else {
    // Otherwise, add it as a favorite
    await ctx.db.insert("favoritePages", {
      pageId,
      creatorId: userId,
      workspaceId,
    });
  }

  // Update the page's last edited details
  await ctx.db.patch(pageId, {
    updatedAt: Date.now(),
    lastEditedBy: userId,
  });
};
