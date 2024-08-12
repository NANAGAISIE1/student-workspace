"use client";
import { UserProfileMenu } from "./user-profile-dropdown-menu";
import { Button } from "@/components/ui/button";
import { HomeIcon, InboxIcon, PenBox, Search } from "lucide-react";
import WorkspaceAi from "./workspace-ai";
import { useSearchStore } from "../dialogs/use-search-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "@/actions/documents";
import { useRouter } from "next/navigation";

type Props = {};

const SidebarMenu = (props: Props) => {
  const { toggleSearchDialog } = useSearchStore((state) => state);
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createDocument,
    onSuccess: (document) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      router.push(`/app/${document?.id}`);
    },
  });

  const handleCreateDocument = () => {
    mutation.mutate();
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
