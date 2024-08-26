import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { TooltipContentProps } from "@radix-ui/react-tooltip";

interface Props extends TooltipContentProps {
  children: React.ReactNode;
  message: string;
}

const Hints = ({ ...props }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent {...props}>
          <p>{props.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hints;
