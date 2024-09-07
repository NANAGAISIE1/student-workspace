import { LayoutTemplate } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import { Separator } from "@/components/shadcn-ui/separator";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import SidebarWrapper from "./sidebar-wrapper";
import SidebarMenu from "./side-bar-menu";
import Hints from "@/components/hints";
import TrashPopover from "../../../../features/pages/components/actions/trash-popover";
import PrivatePagesNav from "@/features/pages/components/private-pages-nav";
import FavoritePageNav from "@/features/pages/components/favorite-pages-nav";
import SharedPagesNav from "@/features/pages/components/shared-pages-nav";

const Sidebar = async () => {
  return (
    <SidebarWrapper>
      <SidebarMenu />
      <Separator />
      <ScrollArea className="flex h-full w-full flex-col justify-start overflow-y-auto px-2">
        <FavoritePageNav />
        <SharedPagesNav />
        <PrivatePagesNav />
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
