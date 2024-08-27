import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  currentStep: number;
  prev: () => void;
  next: () => void;
  totalSteps: number;
};

const OnboardingNavigation = ({
  currentStep,
  prev,
  next,
  totalSteps,
}: Props) => {
  const router = useRouter();
  return (
    <>
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={currentStep === 0 ? () => router.push("/app") : prev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={next}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute inset-x-64 bottom-20 flex items-center justify-between space-x-14">
        <Button
          variant="outline"
          onClick={prev}
          disabled={currentStep === 0}
          className="w-full"
        >
          Back
        </Button>
        <Button onClick={next} className="w-full">
          {currentStep === totalSteps - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </>
  );
};

export default OnboardingNavigation;
