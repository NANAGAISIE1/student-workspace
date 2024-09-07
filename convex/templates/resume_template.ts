import { Content, Template } from "./type";

const resumeTemplateContent: Content = [
  {
    type: "heading",
    props: {
      level: 1,
    },
    content: "Alex Johnson",
  },
  {
    type: "paragraph",
    content:
      "alex.johnson@email.com | (555) 123-4567 | San Francisco, CA | linkedin.com/in/alexjohnson",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "Professional Summary",
  },
  {
    type: "paragraph",
    content:
      "Dedicated and innovative Software Engineer with 5+ years of experience in full-stack development. Proficient in JavaScript, React, and Node.js, with a strong background in building scalable web applications. Passionate about creating user-centric solutions and driving technological advancements.",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "Work Experience",
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "Senior Software Engineer, TechCorp Inc.",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "June 2021 - Present",
        styles: { italic: true },
      },
    ],
  },
  {
    type: "bulletListItem",
    content:
      "Led the development of a high-performance e-commerce platform, resulting in a 30% increase in user engagement and a 25% boost in sales conversion rates",
  },
  {
    type: "bulletListItem",
    content:
      "Implemented robust CI/CD pipelines, reducing deployment time by 40% and improving overall code quality",
  },
  {
    type: "bulletListItem",
    content:
      "Mentored junior developers, fostering a collaborative team environment and improving team productivity by 20%",
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "Software Engineer, StartUp Solutions",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "August 2019 - May 2021",
        styles: { italic: true },
      },
    ],
  },
  {
    type: "bulletListItem",
    content:
      "Developed and maintained RESTful APIs using Node.js and Express, serving over 1 million daily active users",
  },
  {
    type: "bulletListItem",
    content:
      "Optimized database queries, resulting in a 50% reduction in average response time",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "Education",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Bachelor of Science in Computer Science",
        styles: { bold: true },
      },
    ],
  },
  {
    type: "paragraph",
    content: "University of California, Berkeley, 2019",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "Skills",
  },
  {
    type: "bulletListItem",
    content: "Programming Languages: JavaScript (ES6+), Python, Java",
  },
  {
    type: "bulletListItem",
    content: "Web Technologies: React, Node.js, Express, HTML5, CSS3, GraphQL",
  },
  {
    type: "bulletListItem",
    content: "Database: MongoDB, PostgreSQL, Redis",
  },
  {
    type: "bulletListItem",
    content: "Tools & Platforms: Git, Docker, AWS, Jenkins, Jira",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "Projects / Achievements",
  },
  {
    type: "bulletListItem",
    content:
      "Open-source contributor to React Native, with 3 accepted pull requests improving app performance",
  },
  {
    type: "bulletListItem",
    content:
      "Won first place in the 2023 Bay Area Hackathon for developing an AI-powered personal finance app",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Tip: Customize sections as needed. Use '/' to add or remove sections.",
        styles: { italic: true, textColor: "gray" },
      },
    ],
  },
];

export const resumeTemplate: Template = {
  title: "Online Resume",
  type: "site",
  pageType: "page",
  emoji: "💼",
  content: JSON.stringify(resumeTemplateContent),
};
