"use client";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { useQueryWithStatus } from "@/services/convex-query";
import { Clock } from "lucide-react";
import HomePageCarousel from "./carousel";

type Props = {
  workspaceId: Id<"workspaces">;
};

const RecentlyVisited = ({ workspaceId }: Props) => {
  const { data: pages, isPending } = useQueryWithStatus(
    api.pages.query.getPagesByWorkspaceId,
    { workspaceId },
  );

  if (pages?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <p className="!mt-0 text-sm text-muted-foreground">Recently visited</p>
      </div>
      <HomePageCarousel workspaceId={workspaceId} />
    </>
  );
};

export default RecentlyVisited;
