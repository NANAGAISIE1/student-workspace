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
    plan: v.optional(v.union(v.literal("free"), v.literal("pro"))),
  }).index("email", ["email"]),

  organizations: defineTable({
    name: v.string(),
    type: v.union(
      v.literal("college"),
      v.literal("team"),
      v.literal("personal"),
    ),
    ownerId: v.id("users"),
    members: v.optional(v.array(v.id("users"))),
    updatedAt: v.number(),
  }).index("by_owner", ["ownerId"]),

  userOrganizations: defineTable({
    userId: v.id("users"),
    organizationId: v.id("organizations"),
    role: v.union(v.literal("admin"), v.literal("member")),
  })
    .index("by_user", ["userId"])
    .index("by_organization", ["organizationId"]),

  workspaces: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_organization", ["organizationId"]),

  pages: defineTable({
    title: v.string(),
    workspaceId: v.id("workspaces"),
    creatorId: v.id("users"),
    content: v.optional(v.string()),
    emoji: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_creator", ["creatorId"]),

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

  deletedPages: defineTable({
    title: v.string(),
    workspaceId: v.id("workspaces"),
    creatorId: v.id("users"),
    content: v.optional(v.string()),
    emoji: v.optional(v.string()),
    updatedAt: v.number(),
  }).index("by_creator", ["creatorId"]),

  deletedWorkspaces: defineTable({
    workspaceId: v.id("workspaces"),
    creatorId: v.id("users"),
  }).index("by_creator", ["creatorId"]),
});

export default schema;
