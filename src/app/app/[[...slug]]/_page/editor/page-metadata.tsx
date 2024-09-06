"use client";

import { Input } from "@/components/shadcn-ui/input";
import { useDebounceFull } from "@/hooks/use-debounce";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { useMutation } from "convex/react";
import React from "react";

type Props = {
  pageTitle: string;
  pageId: Id<"pages">;
};

const PageMetadata = ({ pageTitle, pageId }: Props) => {
  const [title, setTitle] = React.useState("Untitled");
  const changeTitle = useMutation(api.pages.mutation.renamePageById);
  const debouncedTitleChange = useDebounceFull(changeTitle, 500);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedTitleChange({ pageId, title: e.target.value });
  };

  React.useEffect(() => {
    setTitle(pageTitle);
  }, [pageTitle]);

  return (
    <div>
      <Input
        value={title}
        onChange={handleTitleChange}
        className="focus-visible:ring-offset scroll-m-20 border-none bg-background-dark text-3xl font-semibold tracking-tight ring-transparent focus:border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
      />
    </div>
  );
};

export default PageMetadata;
