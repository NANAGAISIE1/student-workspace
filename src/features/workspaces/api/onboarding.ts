import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "@convex/api";
import { useMutation } from "@tanstack/react-query";

export const useOnboardingMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.shared.mutation.onboarding),
  });
