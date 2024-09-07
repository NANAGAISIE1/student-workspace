import { MyPartialBlock } from "../../src/app/app/[[...slug]]/_page/editor";

export type Template = {
  title: string;
  type: "notes" | "research" | "site" | "gettingStarted";
  emoji: string;
  pageType: "page" | "todo" | "calendar";
  content: string;
};

export type Content = MyPartialBlock[];
