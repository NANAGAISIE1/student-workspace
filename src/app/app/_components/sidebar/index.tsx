import { LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarWrapper from "./sidebar-wrapper";
import SidebarMenu from "./side-bar-menu";
import FavoritePages from "./pages/favorites";
import SharedPages from "./pages/shared";
import PrivatePages from "./pages/private";
import Hints from "@/components/hints";
import TrashPopover from "./pages/actions/trash-popover";

const Sidebar = async () => {
  return (
    <SidebarWrapper>
      <SidebarMenu />
      <Separator />
      <ScrollArea className="flex h-full w-full flex-col justify-start overflow-y-auto px-2">
        <FavoritePages />
        <SharedPages />
        <PrivatePages />
      </ScrollArea>
      <div className="flex flex-col space-y-2 px-2">
        <Hints message="Coming soon" side="top" align="center">
          <Button
            className="justify-start"
            variant={"ghost"}
            size={"sm"}
            // disabled
          >
            <LayoutTemplate className="mr-2 h-4 w-4" />
            <p className="!mt-0">Templates</p>
          </Button>
        </Hints>
        <TrashPopover />
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
