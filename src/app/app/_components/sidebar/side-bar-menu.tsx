"use client";

import { UserProfileMenu } from "./user-profile-dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ArrowLeftToLineIcon,
  HomeIcon,
  InboxIcon,
  PenBox,
  Search,
  SettingsIcon,
} from "lucide-react";
import WorkspaceAi from "./workspace-ai";
import { useSearchStore } from "../dialogs/use-search-dialog";
import { useSidebarStore } from "./use-sidebar";
import Link from "next/link";
import { useWorkspaceStore } from "../../[[...slug]]/_workspace/current-workspace-store";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";

type Props = {};

const SidebarMenu = (props: Props) => {
  const { toggleSearchDialog } = useSearchStore((state) => state);
  const { toggleSidebar } = useSidebarStore((state) => state);
  const { workspaceId } = useWorkspaceStore((state) => state);
  const createPage = useMutation(api.pages.mutation.createPage);
  const router = useRouter();
  const pathname = usePathname();

  const handleCreateDocument = async () => {
    const documentId = await createPage({
      workspaceId: workspaceId as Id<"workspaces">,
    });
    router.push(`/app/${workspaceId}/${documentId}`);
  };

  return (
    <div className="flex flex-col space-y-2 px-2">
      <div className="flex items-center justify-between space-x-2">
        <UserProfileMenu />
        <Button size={"icon"} variant={"ghost"} onClick={toggleSidebar}>
          <ArrowLeftToLineIcon className="h-4 w-4" />
        </Button>
        <Button size={"icon"} variant={"ghost"} onClick={handleCreateDocument}>
          <PenBox className="h-4 w-4" />{" "}
        </Button>
      </div>
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={toggleSearchDialog}
        className="justify-start"
      >
        <Search className="mr-2 h-4 w-4" />
        <p className="!mt-0">Search...</p>
      </Button>
      <WorkspaceAi />
      <Link
        className={buttonVariants({
          className: cn(
            "!justify-start",
            pathname === `/app/${workspaceId}` && "bg-accent",
          ),
          variant: "ghost",
          size: "sm",
        })}
        href={`/app/${workspaceId}`}
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
