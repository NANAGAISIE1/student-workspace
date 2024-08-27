import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { motion } from "framer-motion";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import Image from "next/image";
import { OnboardingFormInputs } from "@/features/workspaces/types/onboarding-form-schema";
import { onboardingWorkspaceInterests } from "@/features/workspaces/constants/onboarding";

interface Step2Props {
  register: UseFormRegister<OnboardingFormInputs>;
  setValue: UseFormSetValue<OnboardingFormInputs>;
  watch: any;
  errors: FieldErrors<OnboardingFormInputs>;
  delta: number;
}

const Step2: React.FC<Step2Props> = ({ register, setValue, watch, delta }) => {
  const [selectedInterests, setSelectedInterests] = useState<
    OnboardingFormInputs["interests"]
  >([]);

  useEffect(() => {
    const interests = watch("interests") || [];
    setSelectedInterests(interests);
  }, [watch]);

  const handleToggle = (value: OnboardingFormInputs["interests"][number]) => {
    let updatedInterests;
    if (selectedInterests.includes(value)) {
      updatedInterests = selectedInterests.filter(
        (interest) => interest !== value,
      );
    } else {
      updatedInterests = [...selectedInterests, value];
    }
    setSelectedInterests(updatedInterests);
    setValue("interests", updatedInterests); // Set the form value programmatically
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
            Select as many as you like
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          {onboardingWorkspaceInterests.map((interest) => (
            <Toggle
              key={interest.type}
              value={interest.type}
              variant={"outline"}
              className={`flex h-16 w-40 items-center p-2 ${
                selectedInterests.includes(interest.type) ? "bg-muted" : ""
              }`}
              onClick={() => handleToggle(interest.type)}
            >
              {interest.icon}
              {interest.title}
            </Toggle>
          ))}
        </div>
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
