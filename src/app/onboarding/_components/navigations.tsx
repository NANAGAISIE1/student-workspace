import { Button } from "@/components/shadcn-ui/button";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  step: number;
  prev: () => void;
  next: () => void;
  totalSteps: number;
  isSubmitting: boolean;
  isStepValid: boolean;
};

const OnboardingNavigation: React.FC<Props> = ({
  step,
  prev,
  isSubmitting,
  next,
  totalSteps,
  isStepValid,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="absolute left-0 top-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={step === 0 ? () => router.push("/app") : prev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-20 flex items-center justify-between space-x-14">
        <Button
          onClick={next}
          disabled={isSubmitting || !isStepValid}
          className="w-32 bg-vibrant-blue/80 text-accent-foreground hover:bg-vibrant-blue"
        >
          {isSubmitting && (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {step === totalSteps - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </>
  );
};

export default OnboardingNavigation;
