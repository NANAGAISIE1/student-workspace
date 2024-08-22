"use client";

import { UserProfileMenu } from "./user-profile-dropdown-menu";
import { Button } from "@/components/ui/button";
import { HomeIcon, InboxIcon, PenBox, Search } from "lucide-react";
import WorkspaceAi from "./workspace-ai";
import { useSearchStore } from "../dialogs/use-search-dialog";
import { useMutation } from "convex/react";
import { api } from "@convex/api";
import { useRouter } from "next/navigation";

type Props = {};

const SidebarMenu = (props: Props) => {
  const router = useRouter();
  const { toggleSearchDialog } = useSearchStore((state) => state);

  const mutation = useMutation(api.documents.mutation.createDocument);

  const handleCreateDocument = async () => {
    const documentId = await mutation();
    router.push(`/app/${documentId}`);
  };

  return (
    <div className="flex flex-col space-y-2 px-2">
      <div className="flex justify-between space-x-2">
        <UserProfileMenu />
        <Button size={"icon"} variant={"ghost"} onClick={handleCreateDocument}>
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
        <HomeIcon className="h-4 w-4 mr-2" />
        <p className="!mt-0">Home</p>
      </Button>
      <Button className="justify-start" variant={"ghost"} size={"sm"}>
        <InboxIcon className="h-4 w-4 mr-2" />
        <p className="!mt-0">Inbox</p>
      </Button>
    </div>
  );
};

export default SidebarMenu;
