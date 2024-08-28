type Template = {
  title: string;
  type: "page" | "todo" | "calendar";
  emoji: string;
  content: string;
};

type InterestsTemplates = {
  notes: Template;
  research: Template;
  site: Template;
};

export const interestsTemplates: InterestsTemplates = {
  notes: {
    title: "Class Notes",
    type: "page",
    emoji: "📝",
    content: `# Class Notes
This is an example document for class notes. You can use this document to create your own class notes.`,
  },
  research: {
    title: "Research Paper",
    type: "page",
    emoji: "🔍",
    content: `# Research Paper
This is an example document for a research paper. You can use this document to create your own research paper.`,
  },
  site: {
    title: "Online Resume",
    type: "page",
    emoji: "💼",
    content: `# Online Resume
This is an example document for an online resume. You can use this document to create your own online resume.`,
  },
};

export const gettingStartedTemplate: Template = {
  title: "Getting Started",
  type: "page",
  emoji: "🚀",
  content: `Welcome to Convex! Here are some tips to get you started:
  This is an example document for getting started. You can use this document to create your own getting started guide.`,
};
