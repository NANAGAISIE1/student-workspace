import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(
      v.union(v.literal("student"), v.literal("lecturer"), v.literal("admin")),
    ),
  }).index("email", ["email"]),

  workspaces: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
    updatedAt: v.number(),
    archived: v.optional(v.boolean()),
    updatedBy: v.optional(v.id("users")),
    plan: v.optional(
      v.union(v.literal("free"), v.literal("personal"), v.literal("team")),
    ),
  })
    .index("by_owner_id", ["ownerId"])
    .index("by_archived", ["archived"])
    .index("by_updated_by", ["updatedBy"])
    .index("by_plan", ["plan"]),

  workspaceMembers: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("member"), v.literal("guest")),
  })
    .index("by_workspace_id", ["workspaceId"])
    .index("by_user_id", ["userId"])
    .index("by_workspace_id_user_id", ["workspaceId", "userId"])
    .searchIndex("search_role", {
      searchField: "role",
    })
    .searchIndex("search_user_id", {
      searchField: "userId",
    }),

  pages: defineTable({
    title: v.string(),
    workspaceId: v.id("workspaces"),
    creatorId: v.id("users"),
    content: v.optional(v.string()),
    emoji: v.optional(v.string()),
    updatedAt: v.number(),
    type: v.optional(
      v.union(v.literal("page"), v.literal("todo"), v.literal("calendar")),
    ),
    parentId: v.optional(v.id("pages")),
    lastEditedBy: v.optional(v.id("users")),
    archived: v.optional(v.boolean()),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_creator", ["creatorId"])
    .index("by_workspace_id_user_id", ["workspaceId", "creatorId"])
    .index("by_workspace_id_parent_id", ["workspaceId", "parentId"])
    .index("by_parent", ["parentId"])
    .searchIndex("search_title", {
      searchField: "title",
    })
    .searchIndex("search_content", {
      searchField: "content",
    })
    .searchIndex("search_emoji", {
      searchField: "emoji",
    }),

  sharedPages: defineTable({
    pageId: v.id("pages"),
    creatorId: v.id("users"),
    workspaceId: v.id("workspaces"),
  })
    .index("by_creator", ["creatorId"])
    .index("by_workspace", ["workspaceId"]),

  favoritePages: defineTable({
    pageId: v.id("pages"),
    creatorId: v.id("users"),
    workspaceId: v.id("workspaces"),
  })
    .index("by_creator", ["creatorId"])
    .index("by_workspace", ["workspaceId"]),

  sites: defineTable({
    creatorId: v.id("users"),
    pageId: v.id("pages"),
  })
    .index("by_creator", ["creatorId"])
    .index("by_page", ["pageId"]),
  pageTemplates: defineTable({
    title: v.string(),
    type: v.union(
      v.literal("notes"),
      v.literal("research"),
      v.literal("site"),
      v.literal("gettingStarted"),
    ),
    emoji: v.string(),
    pageType: v.union(
      v.literal("page"),
      v.literal("todo"),
      v.literal("calendar"),
    ),
    content: v.string(),
  }).index("by_type", ["type"]),
});

export default schema;
