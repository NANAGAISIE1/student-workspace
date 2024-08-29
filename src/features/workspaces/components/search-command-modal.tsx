import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePageQueries } from "@/features/pages/api/query";
import { CommandLoading } from "cmdk";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkspaceStore } from "../store/workspace-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Doc } from "@convex/dataModel";
import { useModalStore } from "@/components/global-modal";
import { useFormattedSearchResults } from "@/hooks/format-string";

type Props = {};

const SearchCommandModal: React.FC<Props> = () => {
  const [search, setSearch] = useState("");
  const { useWorkspaceSearch } = usePageQueries();
  const { workspaceId } = useWorkspaceStore();
  const router = useRouter();
  const { closeModal } = useModalStore((state) => state);

  const { searchResults, isPending } = useWorkspaceSearch(search);

  const { formatTitle, filteredResults } = useFormattedSearchResults(
    searchResults as Doc<"pages">[],
    search,
  );

  if (!workspaceId) {
    return null;
  }

  return (
    <Command>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <DialogDescription className="sr-only">
        Search workspace
      </DialogDescription>
      <CommandInput placeholder="Type to search..." onValueChange={setSearch} />
      <CommandList>
        <ScrollArea className="h-[300px]">
          <CommandEmpty>No results found.</CommandEmpty>

          {isPending && (
            <CommandLoading className="flex items-start justify-start">
              <div className="space-y-2 p-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </CommandLoading>
          )}
          <CommandGroup heading="Pages">
            {filteredResults.map((result) => (
              <CommandItem
                key={result._id}
                value={`${result.title}-${result._id}`}
                onSelect={() => {
                  router.push(`/app/${workspaceId}/${result._id}`);
                  closeModal("search-dialog");
                }}
                onClick={() => {
                  router.push(`/app/${workspaceId}/${result._id}`);
                  closeModal("search-dialog");
                }}
                className="flex cursor-pointer items-center space-x-2 p-2"
              >
                {result.emoji ? (
                  <span className="text-xl">{result.emoji}</span>
                ) : (
                  <FileIcon className="h-4 w-4" />
                )}
                <div className="flex flex-col">
                  <span>{formatTitle(result.title)}</span>
                  {result.content && (
                    <span className="text-sm text-muted-foreground">
                      {result.content.slice(0, 50)}...
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </Command>
  );
};

export default SearchCommandModal;
