import { api } from "@convex/api";
import { useMutation } from "convex/react";

export const useOnboardingMutation = () =>
  useMutation(api.shared.mutation.onboarding);
