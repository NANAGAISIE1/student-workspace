import { internalMutation } from "@convex/server";
import images from "./example_images";

export const uploadExampleImageLinks = internalMutation({
  args: {},
  handler: async (ctx) => {
    await Promise.all(
      images.map(async (image) => {
        await ctx.db.insert("bannerImages", {
          url: image.imageUrl,
        });
      }),
    );
  },
});
