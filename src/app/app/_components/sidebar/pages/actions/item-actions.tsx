import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useQueryWithStatus } from "@/services/convex-query";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { useMutation } from "convex/react";
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

export const PageItemActions: React.FC<{
  nodeId: string;
  workspaceId: string;
}> = ({ nodeId, workspaceId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggleArchivePage = useMutation(api.pages.mutation.toggleArchivePage);
  const toggleFavoritePage = useMutation(api.pages.mutation.toggleFavorite);
  const { data: user } = useQueryWithStatus(api.user.query.getCurrentUser, {});
  const rename = useMutation(api.pages.mutation.renamePageById);
  const { data: page, isPending } = useQueryWithStatus(
    api.pages.query.getPageById,
    {
      pageId: nodeId as Id<"pages">,
    },
  );
  const { data: favorite } = useQueryWithStatus(
    api.pages.query.getFavoriteStatus,
    {
      pageId: nodeId as Id<"pages">,
    },
  );

  const removePage = async () => {
    const deletedPageId = await toggleArchivePage({
      pageId: nodeId as Id<"pages">,
    });

    if (!deletedPageId) {
      toast.warning("Failed to move page to trash");
      return;
    }

    toast.warning("Page moved to trash", {
      action: {
        label: "Undo",
        onClick: async () => await toggleArchivePage({ pageId: deletedPageId }),
      },
    });
    router.push(`/app/${workspaceId}`);
    setOpen(false);
  };

  const renamePage = async (newName: string) => {
    await rename({
      pageId: nodeId as Id<"pages">,
      title: newName,
    });
  };

  const toggleFavorite = async () => {
    if (favorite) {
      await toggleFavoritePage({
        pageId: nodeId as Id<"pages">,
        workspaceId: workspaceId as Id<"workspaces">,
      });
    } else {
      await toggleFavoritePage({
        pageId: nodeId as Id<"pages">,
        workspaceId: workspaceId as Id<"workspaces">,
      });
    }
    setOpen(false);
  };

  if (!page) return;

  const updatedAt = formatRelative(page.updatedAt, new Date());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal className="size-3" />
        </Button>
      </PopoverTrigger>
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
          <p className="!mt-0">Move to trash</p>
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
          <p className="!mt-0">Open in new tab</p>
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
