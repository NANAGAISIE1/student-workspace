import { GraduationCapIcon, LaptopIcon, NotepadTextIcon } from "lucide-react";
import {
  WorkspaceInterest,
  WorkspaceType,
} from "../types/onboarding-form-schema";

export const onboardingWorkspacesTypes: WorkspaceType[] = [
  {
    type: "college",
    title: "For my college",
    description: "Collaborate and share your docs and wikis with your class",
    image: "/images/college.svg",
  },
  {
    type: "team",
    title: "For my team",
    description: "Collaborate on your projects and docs with your team",
    image: "/images/team.svg",
  },
  {
    type: "personal",
    title: "For personal use",
    description:
      "Notes, research, personal projects, and your personal tasks in one place",
    image: "/images/personal.svg",
  },
];

export const onboardingWorkspaceInterests: WorkspaceInterest[] = [
  {
    type: "notes",
    title: "Notes",
    icon: <NotepadTextIcon className="mr-2 h-4 w-4" />,
  },
  {
    type: "research",
    title: "Research",
    icon: <GraduationCapIcon className="mr-2 h-4 w-4" />,
  },
  {
    type: "site",
    title: "Site",
    icon: <LaptopIcon className="mr-2 h-4 w-4" />,
  },
];
