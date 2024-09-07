"use client";
import "@blocknote/core/fonts/inter.css";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  SuggestionMenuController,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from "@blocknote/react";
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
      <BlockNoteView
        editor={editor}
        data-theming-css-student-workspace
        slashMenu={false}
        formattingToolbar={false}
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
        <FormattingToolbarController
          formattingToolbar={() => (
            <FormattingToolbar>
              <BlockTypeSelect key={"blockTypeSelect"} />

              <FileCaptionButton key={"fileCaptionButton"} />
              <FileReplaceButton key={"replaceFileButton"} />

              <BasicTextStyleButton
                basicTextStyle={"bold"}
                key={"boldStyleButton"}
              />
              <BasicTextStyleButton
                basicTextStyle={"italic"}
                key={"italicStyleButton"}
              />
              <BasicTextStyleButton
                basicTextStyle={"underline"}
                key={"underlineStyleButton"}
              />
              <BasicTextStyleButton
                basicTextStyle={"strike"}
                key={"strikeStyleButton"}
              />
              {/* Extra button to toggle code styles */}
              <BasicTextStyleButton
                key={"codeStyleButton"}
                basicTextStyle={"code"}
              />

              <TextAlignButton
                textAlignment={"left"}
                key={"textAlignLeftButton"}
              />
              <TextAlignButton
                textAlignment={"center"}
                key={"textAlignCenterButton"}
              />
              <TextAlignButton
                textAlignment={"right"}
                key={"textAlignRightButton"}
              />

              <ColorStyleButton key={"colorStyleButton"} />

              <NestBlockButton key={"nestBlockButton"} />
              <UnnestBlockButton key={"unnestBlockButton"} />

              <CreateLinkButton key={"createLinkButton"} />
            </FormattingToolbar>
          )}
        />
      </BlockNoteView>
    </div>
  );
}
