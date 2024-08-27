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

export const recursiveFavorite = async (
  ctx: MutationCtx,
  pageId: Id<"pages">,
  userId: Id<"users">,
  workspaceId: Id<"workspaces">,
) => {
  const toggleFavorite = async (pageId: Id<"pages">) => {
    const favorite = await ctx.db
      .query("favoritePages")
      .filter((q) =>
        q.and(
          q.eq(q.field("pageId"), pageId),
          q.eq(q.field("creatorId"), userId),
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
  };

  const recursiveToggle = async (pageId: Id<"pages">) => {
    await toggleFavorite(pageId);

    const children = await ctx.db
      .query("pages")
      .filter((q) => q.eq(q.field("parentId"), pageId))
      .collect();

    for (const child of children) {
      await recursiveToggle(child._id);
    }
  };

  await recursiveToggle(pageId);
};
