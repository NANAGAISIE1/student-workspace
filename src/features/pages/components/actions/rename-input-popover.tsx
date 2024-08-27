import React, { useState } from "react";
import { debounce } from "lodash";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { NotebookPenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RenameInputPopoverProps {
  currentName: string;
  onRename: (newName: string) => void;
}

const RenameInputPopover: React.FC<RenameInputPopoverProps> = ({
  currentName,
  onRename,
}) => {
  const [newName, setNewName] = useState(currentName);
  const [open, isOpen] = useState(false);

  // Debounce function to delay the onRename call
  const debouncedRename = (value: string) =>
    debounce(() => {
      onRename(value);
    }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewName(value);
    debouncedRename(value);
  };

  const handleBlur = () => {
    onRename(newName);
  };

  return (
    <Popover open={open} onOpenChange={isOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-full justify-start space-x-2"
          size={"sm"}
          variant={"ghost"}
        >
          <NotebookPenIcon className="size-4" />
          <p className="!mt-0">Rename</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-1"
        side="left"
        align="start"
        alignOffset={0}
        sideOffset={-50}
      >
        <Input
          value={newName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter new page name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRename(newName);
              isOpen(false);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default RenameInputPopover;
