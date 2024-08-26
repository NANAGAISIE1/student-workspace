"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Step1 from "./step-one";
import Step2 from "./step-two";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@convex/api";

export const FormDataSchema = z.object({
  orgtype: z.enum(["college", "team", "personal"]),
  interests: z.array(z.enum(["notes", "research", "site"])).min(1),
});

export type Inputs = z.infer<typeof FormDataSchema>;

const stepComponents = [Step1, Step2];

// Explicitly typing stepFields
const stepFields: (keyof Inputs)[][] = [
  ["orgtype"], // Fields for Step 1
  ["interests"], // Fields for Step 2
];

export default function OnboardingForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
  });

  const onboardingMutation = useMutation(api.shared.mutation.onboarding);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const id = await onboardingMutation({
      orgtype: data.orgtype,
      interests: data.interests,
    });
    reset();
    router.push(`/app/${id}`);
  };

  const next = async () => {
    const fields = stepFields[currentStep];

    // Trigger validation for the current step's fields
    const valid = await trigger(fields, { shouldFocus: true });
    if (!valid) {
      toast.error("Please select at least one option");
      return;
    }

    // Check if it's the last step
    const isLastStep = currentStep === stepComponents.length - 1;

    if (isLastStep) {
      // If it's the last step, submit the form
      await handleSubmit(processForm)();
    } else {
      // Otherwise, move to the next step
      setPreviousStep(currentStep); // Store the previous step if necessary
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center space-y-6">
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={currentStep === 0 ? () => router.push("/app") : prev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant={"ghost"} size={"sm"} onClick={next}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <form onSubmit={handleSubmit(processForm)} className="w-[80%]">
        <StepComponent
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          delta={delta}
        />
      </form>
      <div className="absolute inset-x-64 bottom-20 flex items-center justify-between space-x-14">
        <Button
          variant={"outline"}
          onClick={prev}
          disabled={currentStep === 0}
          className="w-full"
        >
          Back
        </Button>
        <Button onClick={next} className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}
