import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { OnboardingFormInputs } from "@/features/workspaces/types/onboarding-form-schema";
import { onboardingWorkspacesTypes } from "@/features/workspaces/constants/onboarding";

interface Step1Props {
  register: UseFormRegister<OnboardingFormInputs>;
  setValue: UseFormSetValue<OnboardingFormInputs>;
  errors: FieldErrors<OnboardingFormInputs>;
  delta: number;
  watch: any;
}

const Step1: React.FC<Step1Props> = ({
  setValue,

  delta,
  watch,
}) => {
  const [selectedOrgType, setSelectedOrgType] = useState<
    OnboardingFormInputs["workspaceType"] | null
  >(null);

  useEffect(() => {
    const workspaceType = watch("workspaceType");
    if (workspaceType) setSelectedOrgType(workspaceType);
  }, [watch]);

  const handleToggle = (value: OnboardingFormInputs["workspaceType"]) => {
    setSelectedOrgType(value);
    setValue("workspaceType", value); // Set the form value programmatically
  };

  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-14"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <h2>How are you planning to use Student Workspace?</h2>
        <p className="!mt-0 text-xl text-muted-foreground">
          This helps us tailor your experience
        </p>
      </div>
      <ToggleGroup type="single">
        {onboardingWorkspacesTypes.map((workspace) => (
          <ToggleGroupItem
            key={workspace.type}
            value={workspace.type}
            className={`flex size-72 w-full flex-col p-3 ${
              selectedOrgType === workspace.type ? "bg-muted" : ""
            }`}
            onClick={() => handleToggle(workspace.type)}
          >
            <Image
              src={workspace.image}
              alt={workspace.title}
              width={100}
              height={100}
            />
            <h3>{workspace.title}</h3>
            <p>{workspace.description}</p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </motion.div>
  );
};

export default Step1;
