import { motion } from "framer-motion";
import { Toggle } from "@/components/shadcn-ui/toggle";
import Image from "next/image";
import { onboardingWorkspaceInterests } from "@/features/workspaces/constants/onboarding";
import { OnboardingFormInputs } from "@/features/workspaces/types/onboarding-form-schema";
import { StepComponentProps } from "../types";

const Step2: React.FC<StepComponentProps> = ({
  setValue,
  watch,
  delta,
  errors,
}) => {
  const selectedInterests = watch("interests");

  const handleToggle = (value: OnboardingFormInputs["interests"][number]) => {
    const updatedInterests = selectedInterests.includes(value)
      ? selectedInterests.filter((interest) => interest !== value)
      : [...selectedInterests, value];
    setValue("interests", updatedInterests, { shouldValidate: true });
  };

  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="grid w-full grid-cols-2 items-center justify-center gap-16"
    >
      <div className="space-y-14">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2>What are your interests?</h2>
          <p className="!mt-0 text-xl text-muted-foreground">
            Select at least one option
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          {onboardingWorkspaceInterests.map((interest) => (
            <Toggle
              key={interest.type}
              pressed={selectedInterests.includes(interest.type)}
              onPressedChange={() => handleToggle(interest.type)}
              variant="outline"
              className="flex h-16 w-40 items-center p-2"
            >
              {interest.icon}
              {interest.title}
            </Toggle>
          ))}
        </div>
        {errors.interests && (
          <p className="text-red-500">{errors.interests.message}</p>
        )}
      </div>
      <div className="flex items-center justify-end">
        <Image
          src="/svgs/oc-growing.svg"
          alt="Interests"
          width={400}
          height={400}
        />
      </div>
    </motion.div>
  );
};

export default Step2;
