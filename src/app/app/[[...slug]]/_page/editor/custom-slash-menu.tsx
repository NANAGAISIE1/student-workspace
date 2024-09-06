import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import { HandshakeIcon } from "lucide-react";

// Custom Slash Menu item to insert a block after the current one.
const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: "Insert Hello World",
  onItemClick: () => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;

    // New block we want to insert.
    const helloWorldBlock: PartialBlock = {
      type: "paragraph",
      content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
    };

    // Inserting the new block after the current one.
    editor.insertBlocks([helloWorldBlock], currentBlock, "after");
  },
  aliases: ["helloworld", "hw"],
  group: "Other",
  icon: <HandshakeIcon size={18} />,
  subtext: "Used to insert a block with 'Hello World' below.",
});

// Slash menu item to insert an Alert block
// export const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
//   title: "Alert",
//   onItemClick: () => {
//     insertOrUpdateBlock(editor, {
//       type: "alert",
//     });
//   },
//   aliases: [
//     "alert",
//     "notification",
//     "emphasize",
//     "warning",
//     "error",
//     "info",
//     "success",
//   ],
//   group: "Other",
//   icon: <AlertCircleIcon />,
// });

// List containing all default Slash Menu Items, as well as our custom one.
export const getCustomSlashMenuItems = (
  editor: BlockNoteEditor,
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertHelloWorldItem(editor),
];
