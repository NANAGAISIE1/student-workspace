import { z } from "zod";

export const onBoardingFormSchema = z.object({
  workspaceType: z.enum(["college", "team", "personal"]),
  interests: z.array(z.enum(["notes", "research", "site"])).min(1),
});

export type OnboardingFormInputs = z.infer<typeof onBoardingFormSchema>;

// Explicitly typing stepFields
export const stepFields: (keyof OnboardingFormInputs)[][] = [
  ["workspaceType"], // Fields for Step 1
  ["interests"], // Fields for Step 2
];

export type WorkspaceType = {
  type: OnboardingFormInputs["workspaceType"];
  title: string;
  description: string;
  image: string;
};

export type WorkspaceInterest = {
  type: OnboardingFormInputs["interests"][number];
  title: string;
  icon: JSX.Element;
};
