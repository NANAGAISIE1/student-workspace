import Hints from "@/components/hints";
import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { api } from "@convex/api";
import { Doc } from "@convex/dataModel";
import { useMutation } from "convex/react";
import { TrashIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  page: Doc<"deletedPages">;
  workspaceId: string;
};

const TrashList = ({ page, workspaceId }: Props) => {
  const moveBackToPages = useMutation(api.pages.mutation.moveBackToPagesById);
  const deletePage = useMutation(api.pages.mutation.deletePagePermanentlyById);

  const restorePage = async () => {
    await moveBackToPages({ pageId: page._id });
    toast.success("Page restored");
  };

  const deletePagePermanently = async () => {
    await deletePage({ pageId: page._id });
    toast.error("Page deleted");
  };

  return (
    <CommandItem className="group py-1">
      <Link href={`/app/${workspaceId}/${page._id}`} className="flex flex-1">
        {page.title}
      </Link>
      <div className="flex space-x-1 opacity-0 group-hover:opacity-100">
        <Hints message="Restore" side="top">
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={restorePage}
          >
            <Undo2Icon className="h-4 w-4" />
          </Button>
        </Hints>
        <Hints message="Delete" side="top">
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={deletePagePermanently}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </Hints>
      </div>
    </CommandItem>
  );
};

export default TrashList;
