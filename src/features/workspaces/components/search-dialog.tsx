"use client";

import { useModalStore } from "@/components/global-modal";
import { Button } from "@/components/ui/button";
import SearchCommandModal from "./search-command-modal";
import { SearchIcon } from "lucide-react";
import { DialogContent } from "@/components/ui/dialog";
import { useWorkspaceStore } from "../store/workspace-store";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchDialog() {
  const openModal = useModalStore((state) => state.openModal);
  const { workspaceId } = useWorkspaceStore();
  const openSeaarchDialog = () =>
    openModal({
      id: "search-dialog",
      children: (
        <DialogContent className="p-1">
          <SearchCommandModal />
        </DialogContent>
      ),
      type: "dialog",
    });

  if (!workspaceId) {
    return <Skeleton className="h-9 w-full" />;
  }

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={openSeaarchDialog}
      className="justify-start"
    >
      <SearchIcon className="mr-2 h-4 w-4" />
      <p className="!mt-0">Search...</p>
    </Button>
  );
}
