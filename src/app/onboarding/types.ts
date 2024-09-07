import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { OnboardingFormInputs } from "@/features/workspaces/types/onboarding-form-schema";

export interface StepComponentProps {
  register: UseFormRegister<OnboardingFormInputs>;
  setValue: UseFormSetValue<OnboardingFormInputs>;
  watch: UseFormWatch<OnboardingFormInputs>;
  errors: FieldErrors<OnboardingFormInputs>;
  delta: number;
}
