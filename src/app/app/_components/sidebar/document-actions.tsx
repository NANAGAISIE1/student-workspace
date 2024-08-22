import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { useMutation } from "convex/react";
import { MoreHorizontal, TrashIcon, User } from "lucide-react";

type Props = {
  documentId: Id<"documents">;
};

const DocumentActions = ({ documentId }: Props) => {
  const mutation = useMutation(api.documents.mutation.removeDocument);

  const removeDocument = async () => {
    await mutation({ id: documentId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={removeDocument}
            className="hover:text-danger-foreground hover:bg-danger"
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Rename</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentActions;
