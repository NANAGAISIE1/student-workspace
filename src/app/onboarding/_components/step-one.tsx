import { motion } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
import { onboardingWorkspacesTypes } from "@/features/workspaces/constants/onboarding";
import { OnboardingFormInputs } from "@/features/workspaces/types/onboarding-form-schema";
import { StepComponentProps } from "../types";

const Step1: React.FC<StepComponentProps> = ({
  setValue,
  watch,
  delta,
  errors,
}) => {
  const workspaceType = watch("workspaceType");

  const handleToggle = (value: OnboardingFormInputs["workspaceType"]) => {
    setValue("workspaceType", value, { shouldValidate: true });
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
      <ToggleGroup
        type="single"
        value={workspaceType}
        onValueChange={handleToggle}
      >
        {onboardingWorkspacesTypes.map((workspace) => (
          <ToggleGroupItem
            key={workspace.type}
            value={workspace.type}
            className={`flex size-72 w-full flex-col p-3 ${
              workspaceType === workspace.type ? "bg-muted" : ""
            }`}
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
      {errors.workspaceType && (
        <p className="text-red-500">{errors.workspaceType.message}</p>
      )}
    </motion.div>
  );
};

export default Step1;
