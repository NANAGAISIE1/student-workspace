"use client";
import CoverPicker from "./image-picker";
import Image from "next/image";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { useQueryWithStatus } from "@/services/convex-query";
import PageMetadata from "./page-metadata";
import EmojiPickerComponent from "./emoji-picker";
import { SmilePlus } from "lucide-react";

type Props = {
  preloadedPage: Preloaded<typeof api.pages.query.getPageById>;
};

const ImageBanner = ({ preloadedPage }: Props) => {
  const page = usePreloadedQuery(preloadedPage);
  const changeImageBanner = useMutation(
    api.pages.mutation.changeImageBannerById,
  );
  const changeEmoji = useMutation(api.pages.mutation.changeEmojiById);

  const { data: image } = useQueryWithStatus(
    api.images.query.getBannerImageById,
    page && page.imageBanner
      ? {
          id: page.imageBanner,
        }
      : "skip",
  );

  if (!page) return null;

  const handleEmojiChange = (emoji: string) => {
    changeEmoji({ pageId: page._id, emoji });
  };

  const handleImageChange = (bannerId: Id<"bannerImages"> | null) => {
    if (!bannerId) {
      changeImageBanner({ pageId: page._id, remove: true });
      return;
    }
    if (bannerId) {
      changeImageBanner({ pageId: page._id, imageBanner: bannerId });
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-52">
        <CoverPicker setNewCover={handleImageChange} pageId={page._id}>
          <div className="group relative cursor-pointer">
            <h2 className="absolute hidden h-full w-full items-center justify-center p-4 group-hover:flex">
              Change Cover
            </h2>
            {image ? (
              <div className="group-hover:opacity-40">
                <Image
                  src={image.url}
                  width={400}
                  alt={image.url}
                  height={400}
                  className="h-52 w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-52 w-full flex-1 bg-accent group-hover:opacity-50"></div>
            )}
          </div>
        </CoverPicker>
        <div className="absolute ml-10 mt-[-40px] cursor-pointer px-20">
          <EmojiPickerComponent
            setEmojiIcon={(emoji) => {
              handleEmojiChange(emoji);
            }}
          >
            <div className="rounded-md p-4">
              {page.emoji ? (
                <span className="text-5xl">{page.emoji}</span>
              ) : (
                <SmilePlus className="h-10 w-10 text-gray-500" />
              )}
            </div>
          </EmojiPickerComponent>
        </div>
      </div>
      <PageMetadata
        pageId={page._id}
        pageTitle={page.title}
        emoji={page.emoji}
      />
    </div>
  );
};

export default ImageBanner;
