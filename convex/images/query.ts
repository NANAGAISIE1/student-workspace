import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "@convex/server";
import { v } from "convex/values";

export const getBannerImages = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const images = await ctx.db.query("bannerImages").collect();

    return images;
  },
});

export const getBannerImageById = query({
  args: { id: v.id("bannerImages") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const image = await ctx.db.get(id);

    return image;
  },
});
