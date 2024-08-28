"use client";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import TrashList from "./trash-list";
import { useQueryWithStatus } from "@/services/convex-query";
import { api } from "@convex/api";
import { useWorkspaceStore } from "@/app/app/[[...slug]]/_workspace/current-workspace-store";

type Props = {};

const TrashPopover = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { workspaceId } = useWorkspaceStore((state) => state);
  const { data: pages } = useQueryWithStatus(
    api.pages.query.getArchivedPagesByWorkspaceId,
    workspaceId ? { workspaceId } : "skip",
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="justify-start"
          variant={"ghost"}
          size={"sm"}
          onClick={() => setOpen(!open)}
        >
          <Trash2Icon className="mr-2 h-4 w-4" />
          <p className="!mt-0">Trash</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="relative flex size-[25rem] flex-col overflow-hidden p-1"
        side="right"
        align="end"
        sideOffset={15}
        alignOffset={15}
      >
        <Command>
          <CommandInput
            className="h-8 w-full"
            placeholder="Search pages in trash"
          />
          <CommandList className="relative h-full space-y-3">
            <CommandEmpty className="absolute inset-x-0 flex h-full w-full flex-col items-center justify-center">
              <Trash2Icon className="h-16 w-16" />
              No results.
            </CommandEmpty>
            <CommandGroup>
              <div className="flex flex-col space-y-2 py-2">
                {pages &&
                  pages.map((page) => (
                    <TrashList
                      page={page}
                      workspaceId={workspaceId}
                      key={page._id}
                    />
                  ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="absolute inset-x-0 bottom-0 bg-vibrant-blue/20 px-1">
          <Separator />
          <span className="truncate text-xs text-vibrant-blue">
            Pages in trash for over 30 days will automatically be deleted
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TrashPopover;
