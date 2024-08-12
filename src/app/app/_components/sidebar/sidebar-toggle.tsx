"use client";

import { Button } from "@/components/ui/button";
import { LayersIcon, PanelLeftClose } from "lucide-react";
import { useSidebarStore } from "./use-sidebar";

type Props = {};

const SidebarToggle = (props: Props) => {
  const { toggleSidebar } = useSidebarStore((state) => state);
  return (
    <div className="flex justify-between px-2">
      <Button size={"icon"} variant={"ghost"}>
        <LayersIcon className="w-4 h-4" />
      </Button>
      <Button size={"icon"} variant={"ghost"} onClick={toggleSidebar}>
        <PanelLeftClose className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SidebarToggle;
