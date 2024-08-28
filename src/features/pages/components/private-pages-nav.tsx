"use client";
import { Skeleton } from "@/components/ui/skeleton";
import PageNavigation from "@/features/pages/components/page-navigation";
import { useWorkspaceStore } from "@/features/workspaces/store/workspace-store";
import { Id } from "@convex/dataModel";
import { usePathname } from "next/navigation";
import { usePage } from "../hooks/use-page";
import { toast } from "sonner";

const PrivatePagesNav = () => {
  const pathname = usePathname();
  const { usePrivatePagesByWorkspaceId } = usePage();
  const { workspaceId: storedWorkspaceId } = useWorkspaceStore(
    (state) => state,
  );
  const {
    pages: privatePages,
    isPending,
    error,
    isError,
  } = usePrivatePagesByWorkspaceId();

  let workspaceId = pathname.split("/")[2] as Id<"workspaces">;

  if (!workspaceId) {
    workspaceId = storedWorkspaceId as Id<"workspaces">;
  }

  if (privatePages?.length === 0 || !privatePages) {
    return null;
  }

  if (isError) {
    toast.error("Failed to fetch your private pages");
    console.error(error);
  }

  return (
    <>
      {isPending ? (
        <ul className="m-0 list-none">
          <li className="flex w-full items-center py-1">
            <Skeleton className="h-9 w-full" />
          </li>
        </ul>
      ) : (
        privatePages && <PageNavigation data={privatePages} title="Private" />
      )}
    </>
  );
};

export default PrivatePagesNav;
