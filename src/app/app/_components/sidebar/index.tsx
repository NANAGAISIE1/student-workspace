"use client";

import { motion } from "framer-motion";
import {
  Home,
  Inbox,
  LayersIcon,
  LayoutTemplate,
  PanelLeftClose,
  PenBox,
  Search,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfileMenu } from "./user-profile-dropdown-menu";
import WorkspaceAi from "./workspace-ai";
import { Separator } from "@/components/ui/separator";
import FavoritesList from "./favorites-list";
import SharedList from "./shared-list";
import PrivateList from "./private-list";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useDocuments } from "@/hooks/use-documents.js";
import { useSidebarStore } from "./use-sidebar";
import { useSearchStore } from "../dialogs/use-search-dialog";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);
  const { toggleSearchDialog } = useSearchStore((state) => state);

  const sidebarVariants = {
    open: { width: "15rem", x: 0 },
    closed: { width: "0", x: "-15rem" },
  };

  // const { createDocument } = useDocuments();

  const handleCreateDocument = async () => {
    try {
      // createDocument();
      // Note: The new note will automatically be selected due to our implementation
      // You might want to add some UI feedback here, e.g., a toast notification
    } catch (error) {
      console.error("Failed to create note:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={isSidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 40,
      }}
      className="fixed top-0 left-0 h-screen border-r bg-background flex flex-col space-y-2 overflow-hidden pb-2"
    >
      <div className="flex justify-between px-2">
        <Button size={"icon"} variant={"ghost"}>
          <LayersIcon className="w-4 h-4" />
        </Button>
        <Button size={"icon"} variant={"ghost"} onClick={toggleSidebar}>
          <PanelLeftClose className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-col space-y-2 px-2">
        <div className="flex justify-between space-x-2">
          <UserProfileMenu />
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={handleCreateDocument}
          >
            <PenBox className="w-4 h-4" />{" "}
          </Button>
        </div>
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={toggleSearchDialog}
          className="justify-start"
        >
          <Search className="h-4 w-4 mr-2" />
          <p className="!mt-0">Search...</p>
        </Button>
        <WorkspaceAi />
        <Button className="justify-start" variant={"ghost"} size={"sm"}>
          <Home className="h-4 w-4 mr-2" />
          <p className="!mt-0">Home</p>
        </Button>
        <Button className="justify-start" variant={"ghost"} size={"sm"}>
          <Inbox className="h-4 w-4 mr-2" />
          <p className="!mt-0">Inbox</p>
        </Button>
      </div>
      <Separator />
      <ScrollArea className="h-full justify-start overflow-y-auto flex flex-col w-full px-2">
        <FavoritesList />
        <SharedList />
        <PrivateList />
      </ScrollArea>
      <div className="flex flex-col space-y-2 px-2">
        <Button className="justify-start" variant={"ghost"} size={"sm"}>
          <LayoutTemplate className="h-4 w-4 mr-2" />
          <p className="!mt-0">Template</p>
        </Button>
        <Button className="justify-start" variant={"ghost"} size={"sm"}>
          <Trash2Icon className="h-4 w-4 mr-2" />
          <p className="!mt-0">Trash</p>
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
