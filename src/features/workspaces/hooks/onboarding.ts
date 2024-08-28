import { useState, useRef } from "react";
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
  const [step, setStep] = useState(0);
  const prevStepRef = useRef(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setCurrentWorkspaceId } = useWorkspaceStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<OnboardingFormInputs>({
    resolver: zodResolver(onBoardingFormSchema),
    mode: "onChange",
    defaultValues: {
      workspaceType: undefined,
      interests: [],
    },
  });

  const onboardingMutation = useOnboardingMutation();

  const processForm: SubmitHandler<OnboardingFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const workspaceId = await onboardingMutation(data);

      if (workspaceId === null) {
        toast.error("Failed to create workspace. Please try again.");
        setStep(0);
        return;
      }

      setCurrentWorkspaceId(workspaceId);
      router.push(`/app/${workspaceId}`);
      reset();
    } catch (error) {
      console.error("Onboarding submission error:", error);
      toast.error("Failed to complete onboarding. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = async () => {
    const fields = stepFields[step];
    const isStepValid = await trigger(fields);

    if (!isStepValid) {
      if (step === 0) {
        toast.error("Please select a workspace type");
      } else if (step === 1) {
        toast.error("Please select at least one interest");
      }
      return;
    }

    if (step === totalSteps - 1) {
      handleSubmit(processForm)();
    } else {
      prevStepRef.current = step;
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      prevStepRef.current = step;
      setStep((prevStep) => prevStep - 1);
    }
  };

  const delta = step - prevStepRef.current;

  return {
    step,
    totalSteps,
    delta,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    isValid,
    next,
    prev,
    isSubmitting,
    processForm,
  };
};
