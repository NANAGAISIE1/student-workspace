import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserIcon } from "lucide-react";

type Props = {};

const SearchCommandModal = (props: Props) => {
  return (
    <>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="h-full overflow-y-hidden">
        <CommandEmpty>No results found.</CommandEmpty>
        <ScrollArea className="flex h-[300px] w-full flex-col">
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
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </>
  );
};

export default SearchCommandModal;
