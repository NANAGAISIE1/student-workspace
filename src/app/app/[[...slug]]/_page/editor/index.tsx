"use client";

import "@blocknote/core/fonts/inter.css";
import { SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@convex/api";

import "./editor.css";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import { getCustomSlashMenuItems } from "./custom-slash-menu";
import PageMetadata from "./page-metadata";

type Props = {
  preloadedPage: Preloaded<typeof api.pages.query.getPageById>;
};

type MyBlockNoteEditor = typeof schema.BlockNoteEditor;
export type MyBlock = typeof schema.Block;
export type MyPartialBlock = typeof schema.PartialBlock;

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    // alert: Alert,
  },
});

// Our <Editor> component we can reuse later
export default function WorkspaceEditor({ preloadedPage }: Props) {
  const page = usePreloadedQuery(preloadedPage);
  const content: MyPartialBlock[] =
    page && page.content
      ? JSON.parse(page?.content)
      : [
          {
            type: "paragraph",
          },
        ];

  const editor = useCreateBlockNote({
    schema,
    initialContent: content,
  });

  if (!editor || !page) {
    return null;
  }

  // Renders the editor instance using a React component.
  return (
    <div className="h-full w-full flex-col space-y-8">
      <PageMetadata pageId={page._id} pageTitle={page.title} />
      <BlockNoteView
        editor={editor}
        data-theming-css-student-workspace
        slashMenu={false}
        shadCNComponents={{}}
        className="px-28"
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          // Replaces the default Slash Menu items with our custom ones.
          getItems={async (query) =>
            filterSuggestionItems([...getCustomSlashMenuItems(editor)], query)
          }
        />
      </BlockNoteView>
    </div>
  );
}
