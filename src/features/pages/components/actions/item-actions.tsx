import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Id } from "@convex/dataModel";
import {
  ArrowUpRightIcon,
  LinkIcon,
  MoreHorizontal,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import RenameInputPopover from "./rename-input-popover";
import { formatRelative } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Hints from "@/components/hints";
import { usePage } from "../../hooks/use-page";
import { useUser } from "@/features/auth/api/users";

export const PageItemActions: React.FC<{
  nodeId: Id<"pages">;
  workspaceId: Id<"workspaces">;
}> = ({ nodeId, workspaceId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    toggleFavoritePage,
    archivePage,
    usePageById,
    useFavoriteStatus,
    renamePageById,
  } = usePage();

  const { user } = useUser();
  const { page } = usePageById(nodeId);
  const { favorite } = useFavoriteStatus(nodeId);

  const removePage = async () => {
    await archivePage(nodeId);

    toast.warning("Page moved to trash", {
      action: {
        label: "Undo",
        onClick: async () => await archivePage(nodeId),
      },
    });
    router.push(`/app/${workspaceId}`);
    setOpen(false);
  };

  const renamePage = async (newName: string) => {
    await renamePageById(nodeId, newName);
  };

  const toggleFavorite = async () => {
    toggleFavoritePage(nodeId, workspaceId);
    setOpen(false);
  };

  if (!page) return;

  const updatedAt = formatRelative(page.updatedAt, new Date());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Hints
        message="Delete, rename and more"
        asChild
        className="text-xs"
        side="bottom"
        align="center"
      >
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="p-2 opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </PopoverTrigger>
      </Hints>
      <PopoverContent
        className="w-56 space-y-2 p-1"
        side="bottom"
        align="start"
      >
        <Button
          className="w-full justify-start space-x-2"
          size={"sm"}
          variant={"ghost"}
          onClick={toggleFavorite}
        >
          {favorite ? (
            <>
              <Icons.RemoveFavoriteIcon className="size-4" />
              <p className="!mt-0">Remove from favorites</p>
            </>
          ) : (
            <>
              <StarIcon className="size-4" />
              <p className="!mt-0">Add to favorites</p>
            </>
          )}
        </Button>
        <Separator />
        <Button
          className="w-full justify-start space-x-2"
          size={"sm"}
          variant={"ghost"}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
          }}
        >
          <LinkIcon className="size-4" />
          <p className="!mt-0">Copy link</p>
        </Button>
        {page && (
          <RenameInputPopover currentName={page.title} onRename={renamePage} />
        )}
        <Button
          className="w-full justify-start space-x-2"
          size={"sm"}
          variant={"ghost"}
          onClick={removePage}
        >
          <TrashIcon className="size-4" />
          <span className="!mt-0">Move to trash</span>
        </Button>
        <Separator />
        <Link
          className={buttonVariants({
            className: "w-full !justify-start space-x-2",
            variant: "ghost",
            size: "sm",
          })}
          href={`/app/${workspaceId}/${nodeId}`}
          target="_blank"
        >
          <ArrowUpRightIcon className="size-4" />
          <span className="!mt-0">Open in new tab</span>
        </Link>
        <Separator />
        <div className="flex flex-col">
          <p className="!mt-0 text-sm text-muted-foreground">
            Last edited by {user?.name}
          </p>
          <span className="text-sm text-muted-foreground">{updatedAt}</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
