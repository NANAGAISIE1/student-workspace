"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import { useQueryWithStatus } from "@/services/convex-query";
import { api } from "@convex/api";
import { Button } from "@/components/shadcn-ui/button";
import { useModalStore } from "@/components/global-modal";
import { Id } from "@convex/dataModel";
import { Ban } from "lucide-react";
import { useMutation } from "convex/react";

type Props = {
  children: React.ReactNode;
  setNewCover: (bannerId: Id<"bannerImages"> | null) => void;
  pageId: Id<"pages">;
};

function CoverPicker({ children, setNewCover, pageId }: Props) {
  const openModal = useModalStore((state) => state.openModal);

  const openSearchDialog = () =>
    openModal({
      id: "search-dialog",
      children: <DialogContents setNewCover={setNewCover} pageId={pageId} />,
      type: "dialog",
    });

  return (
    <div role="button" onClick={openSearchDialog} className="w-full">
      {children}
    </div>
  );
}

const DialogContents = ({
  setNewCover,
  pageId,
}: {
  setNewCover: (bannerId: Id<"bannerImages"> | null) => void;
  pageId: Id<"pages">;
}) => {
  const [selectedCover, setSelectedCover] = useState<Id<"bannerImages"> | null>(
    null,
  );
  const { data: images } = useQueryWithStatus(api.images.query.getBannerImages);

  const removeImage = useMutation(api.pages.mutation.changeImageBannerById);

  const handleRemoveImage = () => {
    setSelectedCover(null);
  };

  const handleUpdate = () => {
    if (selectedCover === null) {
      removeImage({ pageId: pageId, remove: true });
    }
    setNewCover(selectedCover);
  };

  if (!images) return null;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Cover</DialogTitle>
        <DialogDescription>
          <div className="mt-3 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            <div
              className={`rounded-md p-1 hover:bg-accent ${
                selectedCover === null ? "border-2 border-primary" : ""
              }`}
              role="button"
              onClick={handleRemoveImage}
            >
              <Ban className="h-[70px] w-full" />
            </div>
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedCover(image._id)}
                className={`${
                  selectedCover === image._id ? "border-2 border-primary" : ""
                } rounded-md p-1`}
              >
                <Image
                  src={image?.url}
                  width={200}
                  height={140}
                  alt={image.url}
                  className="h-[70px] w-full rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={handleUpdate}>
            Update
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default CoverPicker;
