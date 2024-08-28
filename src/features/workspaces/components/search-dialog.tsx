"use client";

import { useModalStore } from "@/components/global-modal";
import { Button } from "@/components/ui/button";
import SearchCommandModal from "./search-command-modal";
import { SearchIcon } from "lucide-react";

export default function SearchDialog() {
  const openModal = useModalStore((state) => state.openModal);
  const openSeaarchDialog = () =>
    openModal({
      id: "search-dialog",
      children: <SearchCommandModal />,
      type: "command",
    });

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
