"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightToLineIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useSidebarStore } from "./sidebar/use-sidebar";

type Props = {};

const WorkspaceHeader = (props: Props) => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);
  return (
    <motion.header
      className="w-full items-center flex justify-between h-10 flex-1 relative px-2"
      initial={false}
      animate={{
        marginLeft: isSidebarOpen ? "18rem" : "0",
        width: isSidebarOpen ? "calc(100% - 18rem)" : "100%",
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 40,
      }}
    >
      <div className="flex items-center justify-center space-x-1">
        {!isSidebarOpen && (
          <Button size={"icon"} variant={"ghost"} onClick={toggleSidebar}>
            <ArrowRightToLineIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.header>
  );
};

export default WorkspaceHeader;
