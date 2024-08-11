"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LayersIcon, PanelLeftOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useSidebarStore } from "./sidebar/use-sidebar";

type Props = {};

const WorkspaceHeader = (props: Props) => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);
  return (
    <motion.header
      className="w-full items-center flex justify-between h-10 flex-1 relative"
      initial={false}
      animate={{
        marginLeft: isSidebarOpen ? "15rem" : "0",
        width: isSidebarOpen ? "calc(100% - 15rem)" : "100%",
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
          <div className="flex items-center">
            <>
              <Button size={"icon"} variant={"ghost"}>
                <LayersIcon className="w-4 h-4" />
              </Button>
              <Button size={"icon"} variant={"ghost"} onClick={toggleSidebar}>
                <PanelLeftOpen className="w-4 h-4" />
              </Button>
            </>
          </div>
        )}
        <ModeToggle />
      </div>
    </motion.header>
  );
};

export default WorkspaceHeader;
