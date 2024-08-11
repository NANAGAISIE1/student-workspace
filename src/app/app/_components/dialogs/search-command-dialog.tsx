"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreditCard, Settings, User } from "lucide-react";
import { useSearchStore } from "./use-search-dialog";
import { useEffect } from "react";

export default function SearchDialog() {
  const { isSearchDialogOpen, toggleSearchDialog } = useSearchStore(
    (state) => state,
  );
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearchDialog();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  return (
    <CommandDialog open={isSearchDialogOpen} onOpenChange={toggleSearchDialog}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="h-full overflow-y-hidden">
        <CommandEmpty>No results found.</CommandEmpty>
        <ScrollArea className="w-full flex flex-col h-[300px]">
          <CommandGroup heading="Suggestions">
            {/* {documents?.map((document, index) => (
              <CommandItem
                key={document.createdAt.getTime()}
                onSelect={() => handleSelect(index)}
                // onClick={() => handleSelect(index)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span>{document.title}</span>
              </CommandItem>
            ))} */}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
