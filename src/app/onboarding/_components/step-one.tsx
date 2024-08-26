import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Inputs } from "./onboarding-form";
import { useEffect, useState } from "react";

type Organization = {
  type: Inputs["orgtype"];
  title: string;
  description: string;
  image: string;
};

const organizations: Organization[] = [
  {
    type: "college",
    title: "For my college",
    description: "Collaborate and share your docs and wikis with your class",
    image: "/images/college.svg",
  },
  {
    type: "team",
    title: "For my team",
    description: "Collaborate on your projects and docs with your team",
    image: "/images/team.svg",
  },
  {
    type: "personal",
    title: "For personal use",
    description:
      "Notes, research, personal projects, and your personal tasks in one place",
    image: "/images/personal.svg",
  },
];

interface Step1Props {
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  errors: FieldErrors<Inputs>;
  delta: number;
  watch: any;
}

const Step1: React.FC<Step1Props> = ({
  register,
  setValue,
  errors,
  delta,
  watch,
}) => {
  const [selectedOrgType, setSelectedOrgType] = useState<
    Inputs["orgtype"] | null
  >(null);

  useEffect(() => {
    const orgtype = watch("orgtype");
    if (orgtype) setSelectedOrgType(orgtype);
  }, [watch]);

  const handleToggle = (value: Inputs["orgtype"]) => {
    setSelectedOrgType(value);
    setValue("orgtype", value); // Set the form value programmatically
  };

  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-14"
    >
      <div className="flex flex-col space-y-2 items-center justify-center">
        <h2>How are you planning to use Student Workspace?</h2>
        <p className="text-xl text-muted-foreground !mt-0">
          This helps us tailor your experience
        </p>
      </div>
      <ToggleGroup type="single">
        {organizations.map((org) => (
          <ToggleGroupItem
            key={org.type}
            value={org.type}
            className={`w-full size-72 p-3 flex flex-col ${
              selectedOrgType === org.type ? "bg-muted" : ""
            }`}
            onClick={() => handleToggle(org.type)}
          >
            <Image src={org.image} alt={org.title} width={100} height={100} />
            <h3>{org.title}</h3>
            <p>{org.description}</p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </motion.div>
  );
};

export default Step1;
