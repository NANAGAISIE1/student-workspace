"use client";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import PageNavigation from "@/features/pages/components/page-navigation";
import { useWorkspaceStore } from "@/features/workspaces/store/workspace-store";
import { Id } from "@convex/dataModel";
import { usePathname } from "next/navigation";
import { usePage } from "../hooks/use-page";
import { toast } from "sonner";

const SharedPagesNav = () => {
  const pathname = usePathname();
  const { useSharedPagesByWorkspaceId } = usePage();
  const { workspaceId: storedWorkspaceId } = useWorkspaceStore(
    (state) => state,
  );

  // Extract workspaceId from pathname or use the stored one
  const workspaceId = (pathname.split("/")[2] ||
    storedWorkspaceId) as Id<"workspaces">;

  const {
    pages: sharedPages,
    isPending,
    isError,
    error,
  } = useSharedPagesByWorkspaceId(workspaceId);

  if (isError) {
    toast.error("Failed to fetch your private pages");
    console.error(error);
  }

  if (isPending || sharedPages === undefined) {
    return (
      <ul className="m-0 list-none">
        <li className="flex w-full items-center py-1">
          <Skeleton className="h-9 w-full" />
        </li>
      </ul>
    );
  }

  if (!sharedPages) {
    return null;
  }

  console.log(sharedPages);

  return (
    <PageNavigation
      data={sharedPages}
      title="Shared"
      workspaceId={workspaceId}
    />
  );
};

export default SharedPagesNav;
