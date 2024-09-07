import { MyPartialBlock } from "../../src/app/app/[[...slug]]/_page/editor/index";
export type Template = {
  title: string;
  type: "notes" | "research" | "site" | "gettingStarted";
  emoji: string;
  pageType: "page" | "todo" | "calendar";
  content: string;
};

// type Templates = {
//   notes: Template;
//   research: Template;
//   site: Template;
//   gettingStartedTemplate: Template;
// };

type Content = MyPartialBlock[];

const gettingStartedTemplateContent: Content = [
  {
    type: "paragraph",
    content: "👋 Welcome to your workspace!",
  },
  {
    type: "paragraph",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Here are the basics:",
        styles: { bold: true },
      },
    ],
  },
  {
    type: "checkListItem",
    content: "Click anywhere and just start typing",
  },
  {
    type: "checkListItem",
    content:
      "Use '/' to insert blocks, like images, videos, and more. Try it out!",
  },
  {
    type: "checkListItem",
    content: [
      {
        type: "text",
        text: "Highlight any text, and use the menu that pops up to",
        styles: {},
      },
      {
        type: "text",
        text: " ",
        styles: {},
      },
      {
        type: "text",
        text: "style",
        styles: { bold: true },
      },
      {
        type: "text",
        text: " ",
        styles: {},
      },
      {
        type: "text",
        text: "your",
        styles: { italic: true },
      },
      {
        type: "text",
        text: " ",
        styles: {},
      },
      {
        type: "text",
        text: " writing",
        styles: { strike: true },
      },
      {
        type: "text",
        text: " ",
        styles: {},
      },
      {
        type: "text",
        text: "however",
        styles: { code: true, textColor: "red" },
      },
      {
        type: "text",
        text: " ",
        styles: {},
      },
      {
        type: "text",
        text: "you",
        styles: { underline: true },
      },
      {
        type: "text",
        text: " ",
        styles: {},
      },
      {
        type: "text",
        text: "like",
        styles: { backgroundColor: "blue" },
      },
    ],
  },
  {
    type: "checkListItem",
    content:
      "See the ⋮⋮ to the left of this checkbox on hover? Click and drag to move this line",
  },
  {
    type: "checkListItem",
    content: "Click + New page at the top of your sidebar to add a new page",
  },
];

export const pageTemplates: Template[] = [
  {
    title: "Class Notes",
    type: "notes",
    pageType: "page",
    emoji: "📝",
    content: JSON.stringify(gettingStartedTemplateContent),
  },
  {
    title: "Research Paper",
    type: "research",
    pageType: "page",

    emoji: "🔍",
    content: JSON.stringify(gettingStartedTemplateContent),
  },
  {
    title: "Online Resume",
    type: "site",
    pageType: "page",

    emoji: "💼",
    content: JSON.stringify(gettingStartedTemplateContent),
  },
  {
    title: "Getting Started",
    type: "gettingStarted",
    pageType: "page",
    emoji: "🚀",
    content: JSON.stringify(gettingStartedTemplateContent),
  },
];
