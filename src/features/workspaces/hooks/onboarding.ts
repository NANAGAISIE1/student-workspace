import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  OnboardingFormInputs,
  onBoardingFormSchema,
  stepFields,
} from "../types/onboarding-form-schema";
import { useOnboardingMutation } from "../api/onboarding";
import { useWorkspaceStore } from "../store/workspace-store";

export const useOnboardingForm = (totalSteps: number) => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const { setCurrentWorkspaceId } = useWorkspaceStore((state) => state);
  const router = useRouter();
  const delta = currentStep - previousStep;
  const toastId = "onboarding";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<OnboardingFormInputs>({
    resolver: zodResolver(onBoardingFormSchema),
    mode: "onChange",
  });

  const onboardingMutation = useOnboardingMutation();

  const processForm: SubmitHandler<OnboardingFormInputs> = async (data) => {
    const workspaceId = await onboardingMutation({
      workspaceType: data.workspaceType,
      interests: data.interests,
    });

    if (workspaceId) {
      reset();
      setCurrentWorkspaceId(workspaceId);
      router.push(`/app/${workspaceId}`);
    }
  };

  const next = async () => {
    const fields = stepFields[currentStep];
    const valid = await trigger(fields, { shouldFocus: true });
    if (!valid) {
      toast.error("Please select at least one option");
      return;
    }

    const isLastStep = currentStep === totalSteps - 1;

    if (isLastStep) {
      await handleSubmit(processForm)();
    } else {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return {
    currentStep,
    totalSteps,
    delta,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    next,
    prev,
    processForm,
  };
};
