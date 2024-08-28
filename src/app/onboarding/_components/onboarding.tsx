"use client";
import Step1 from "./step-one";
import Step2 from "./step-two";
import OnboardingNavigation from "./navigations";
import { useOnboardingForm } from "@/features/workspaces/hooks/onboarding";

const stepComponents = [Step1, Step2];

export default function Onboarding() {
  const {
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
  } = useOnboardingForm(stepComponents.length);

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center space-y-6">
      <OnboardingNavigation
        currentStep={currentStep}
        prev={prev}
        next={next}
        totalSteps={totalSteps}
      />
      <form onSubmit={handleSubmit(processForm)} className="w-[80%]">
        <StepComponent
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          delta={delta}
        />
      </form>
    </div>
  );
}
