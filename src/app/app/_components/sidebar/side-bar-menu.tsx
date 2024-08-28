"use client";
import { UserProfileMenu } from "./user-profile-dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ArrowLeftToLineIcon,
  HomeIcon,
  InboxIcon,
  PenBox,
  SettingsIcon,
  Sparkles,
} from "lucide-react";
import { useSidebarStore } from "./use-sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import SearchDialog from "@/features/workspaces/components/search-dialog";
import { usePage } from "@/features/pages/hooks/use-page";

type Props = {};

const SidebarMenu = (props: Props) => {
  const { toggleSidebar } = useSidebarStore((state) => state);
  const { createPage, storedWorkspaceId } = usePage();
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-2 px-2">
      <div className="flex items-center justify-between space-x-2">
        <UserProfileMenu />
        <Button size={"icon"} variant={"ghost"} onClick={toggleSidebar}>
          <ArrowLeftToLineIcon className="h-4 w-4" />
        </Button>
        <Button size={"icon"} variant={"ghost"} onClick={() => createPage()}>
          <PenBox className="h-4 w-4" />{" "}
        </Button>
      </div>
      <SearchDialog />
      <Button variant={"ghost"} size={"sm"} className="justify-start">
        <Sparkles className="mr-2 h-4 w-4 text-vibrant-blue" />
        <p className="!mt-0">Workspace AI</p>
      </Button>
      <Link
        className={buttonVariants({
          className: cn(
            "!justify-start",
            pathname === `/app/${storedWorkspaceId}` && "bg-accent",
          ),
          variant: "ghost",
          size: "sm",
        })}
        href={`/app/${storedWorkspaceId}`}
      >
        <HomeIcon className="mr-2 h-4 w-4" />
        <p className="!mt-0">Home</p>
      </Link>
      <Button className="justify-start" variant={"ghost"} size={"sm"}>
        <InboxIcon className="mr-2 h-4 w-4" />
        <p className="!mt-0">Inbox</p>
      </Button>
      <Button className="justify-start" variant={"ghost"} size={"sm"}>
        <SettingsIcon className="mr-2 h-4 w-4" />
        <p className="!mt-0">Setting</p>
      </Button>
    </div>
  );
};

export default SidebarMenu;
