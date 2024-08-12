import { LayoutTemplate, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FavoritesList from "./favorites-list";
import SharedList from "./shared-list";
import PrivateList from "./private-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarWrapper from "./sidebar-wrapper";
import SidebarToggle from "./sidebar-toggle";
import SidebarMenu from "./side-bar-menu";

const Sidebar = async () => {
  return (
    <SidebarWrapper>
      <SidebarToggle />
      <SidebarMenu />
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
    </SidebarWrapper>
  );
};

export default Sidebar;
