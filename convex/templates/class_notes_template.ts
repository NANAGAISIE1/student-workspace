import { Content, Template } from "./type";

const classNotesTemplateContent: Content = [
  {
    type: "heading",
    props: {
      level: 1,
    },
    content: "Introduction to Psychology",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Date: ",
        styles: { bold: true },
      },
      {
        type: "text",
        text: "September 15, 2024",
        styles: {},
      },
    ],
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "Topic: The Brain and Nervous System",
  },
  {
    type: "paragraph",
    content:
      "Overview of the brain's structure and functions, and how the nervous system works.",
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "Key Concepts:",
  },
  {
    type: "bulletListItem",
    content: "Central Nervous System (CNS) vs. Peripheral Nervous System (PNS)",
  },
  {
    type: "bulletListItem",
    content: "Major parts of the brain: cerebrum, cerebellum, and brainstem",
  },
  {
    type: "bulletListItem",
    content: "Neurons and synaptic transmission",
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "Detailed Notes:",
  },
  {
    type: "paragraph",
    content:
      "1. Central Nervous System (CNS):\n   - Consists of the brain and spinal cord\n   - Processes information and coordinates body functions\n\n2. Peripheral Nervous System (PNS):\n   - Connects the CNS to the rest of the body\n   - Divided into somatic and autonomic nervous systems\n\n3. Brain Structure:\n   - Cerebrum: largest part, responsible for higher-order thinking\n   - Cerebellum: coordinates movement and balance\n   - Brainstem: controls vital functions like breathing and heart rate\n\n4. Neurons:\n   - Basic unit of the nervous system\n   - Parts: soma (cell body), dendrites, axon\n   - Communicate through electrical and chemical signals",
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "Questions/Clarifications:",
  },
  {
    type: "bulletListItem",
    content: "How do neurotransmitters affect mood and behavior?",
  },
  {
    type: "bulletListItem",
    content:
      "What's the difference between grey and white matter in the brain?",
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "Action Items:",
  },
  {
    type: "checkListItem",
    content: "Review the diagram of brain structures in the textbook",
  },
  {
    type: "checkListItem",
    content: "Complete the online quiz on nervous system functions",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Tip: Use '/' to insert diagrams or images to supplement your notes.",
        styles: { italic: true, textColor: "gray" },
      },
    ],
  },
];

export const classNotesTemplate: Template = {
  title: "Class Notes",
  type: "notes",
  pageType: "page",
  emoji: "📝",
  content: JSON.stringify(classNotesTemplateContent),
};
