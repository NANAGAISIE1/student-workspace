import Hints from "@/components/hints";
import { Button } from "@/components/shadcn-ui/button";
import { CommandItem } from "@/components/shadcn-ui/command";
import { Doc } from "@convex/dataModel";
import { FileIcon, TrashIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { usePage } from "../../hooks/use-page";

type Props = {
  page: Doc<"pages">;
  workspaceId: string;
};

const TrashList = ({ page, workspaceId }: Props) => {
  const {
    archivePage: togglePageArchive,
    deletePagePermanentlyById: deletePage,
  } = usePage();

  const restorePage = async () => {
    await togglePageArchive(page._id);
    toast.success("Page restored");
  };

  const deletePagePermanently = async () => {
    await deletePage(page._id);
    toast.error("Page deleted");
  };

  return (
    <CommandItem className="group py-1" value={`${page.title}-${page._id}`}>
      <Link
        href={`/app/${workspaceId}/${page._id}`}
        className="flex flex-1 flex-col"
      >
        <span className="flex space-x-2">
          {page.emoji ? (
            <span>{page.emoji}</span>
          ) : (
            <FileIcon className="h-4 w-4" />
          )}
          <span>{page.title}</span>
        </span>
        {page.content && (
          <span className="truncate text-xs text-muted-foreground">
            {page.content.slice(0, 50)}...
          </span>
        )}
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
