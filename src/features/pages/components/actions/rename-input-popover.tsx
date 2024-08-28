import React, { useState, useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { NotebookPenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebounceFull } from "@/hooks/use-debounce";

interface RenameInputPopoverProps {
  currentName: string;
  onRename: (newName: string) => void;
}

const RenameInputPopover: React.FC<RenameInputPopoverProps> = ({
  currentName,
  onRename,
}) => {
  const [newName, setNewName] = useState(currentName);
  const [open, setOpen] = useState(false);

  const debouncedRename = useDebounceFull(onRename, 300);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNewName(value);
      debouncedRename(value);
    },
    [debouncedRename],
  );

  const handleBlur = () => {
    onRename(newName);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-full justify-start space-x-2"
          size="sm"
          variant="ghost"
        >
          <NotebookPenIcon className="size-4" />
          <span>Rename</span>
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
              setOpen(false);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default RenameInputPopover;
