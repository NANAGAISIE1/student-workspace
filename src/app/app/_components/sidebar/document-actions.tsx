import { deleteDocument } from "@/actions/documents";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, TrashIcon, User } from "lucide-react";

type Props = {
  documentId: string;
};

const DocumentActions = ({ documentId }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: (document) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  const removeDocument = () => {
    mutation.mutate({ id: documentId });
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
