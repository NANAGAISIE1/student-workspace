"use client";
import { useDebounceFull } from "@/hooks/use-debounce";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { useMutation } from "convex/react";
import React from "react";

type Props = {
  pageTitle: string;
  emoji?: string;
  pageId: Id<"pages">;
};

const PageMetadata = ({ pageTitle, pageId, emoji: savedEmoji }: Props) => {
  const [title, setTitle] = React.useState(pageTitle);

  const changeTitle = useMutation(api.pages.mutation.renamePageById);

  const debouncedTitleChange = useDebounceFull(changeTitle, 500);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedTitleChange({ pageId, title: e.target.value });
  };

  React.useEffect(() => {
    setTitle(pageTitle);
  }, [pageTitle]);

  return (
    <>
      {/* File Name  */}
      <div className="ml-10 mt-10 p-10 px-20">
        <input
          type="text"
          placeholder="Untitled Document"
          defaultValue={title}
          className="bg-background-dark text-4xl font-bold outline-none"
          onBlur={handleTitleChange}
        />
      </div>
    </>
  );
};

export default PageMetadata;
