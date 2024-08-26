"use client";
import { usePathname } from "next/navigation";
import { useQueryWithStatus } from "@/services/convex-query";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { useWorkspaceStore } from "@/app/app/[[...slug]]/_workspace/current-workspace-store";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkspacePages from "./page-list";
import { Node } from "../pages/types";

const PrivatePages = () => {
  const pathname = usePathname();
  let workspaceId = pathname.split("/")[2] as Id<"workspaces">;

  const { workspaceId: storedWorkspaceId } = useWorkspaceStore(
    (state) => state,
  );

  if (!workspaceId) {
    workspaceId = storedWorkspaceId as Id<"workspaces">;
  }

  const { data: privatePages, isPending } = useQueryWithStatus(
    api.pages.query.getPrivatePagesByWorkspaceId,
    { workspaceId },
  );

  if (privatePages?.length === 0) {
    return null;
  }

  const nodes = privatePages?.map((page) => ({
    name: page.title,
    emoji: page.emoji,
    id: page._id,
  }));

  const privateLists: Node[] = [
    {
      name: "Private",
      id: "private",
      children: nodes,
    },
  ];

  return (
    <>
      {isPending ? (
        <ul className="m-0 list-none">
          <li className="flex w-full items-center py-1">
            <Button variant={"ghost"} className="p-1" size={"sm"}>
              <ChevronRight className="size-4" />
            </Button>
            <Skeleton className="h-9 w-full" />
          </li>
        </ul>
      ) : (
        nodes && <WorkspacePages data={privateLists} workspace={workspaceId} />
      )}
    </>
  );
};

export default PrivatePages;
