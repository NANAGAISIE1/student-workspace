"use client";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { useQueryWithStatus } from "@/services/convex-query";
import { Construction, LayoutPanelTopIcon } from "lucide-react";
import HomePageCarousel from "./carousel";
import { TEMPLATES_UNDER_DEVELOPMENT } from "@/app/constansts/templates";

type Props = {
  workspaceId: Id<"workspaces">;
};

const FeaturedTemplates = ({ workspaceId }: Props) => {
  const { data: pages, isPending } = useQueryWithStatus(
    api.pages.query.getPagesByWorkspaceId,
    { workspaceId },
  );

  const templateUnderDevelpment = TEMPLATES_UNDER_DEVELOPMENT;

  if (pages?.length === 0) {
    return null;
  }

  if (templateUnderDevelpment) {
    return (
      <div className="flex h-full w-full flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <LayoutPanelTopIcon className="h-4 w-4 text-muted-foreground" />
          <p className="!mt-0 text-sm text-muted-foreground">
            Featured templates
          </p>
        </div>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
          <Construction className="h-40 w-40 items-center justify-center text-muted-foreground" />
          <p className="text-muted-foreground">
            Templates are under development
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <LayoutPanelTopIcon className="h-4 w-4 text-muted-foreground" />
        <p className="!mt-0 text-sm text-muted-foreground">
          Featured templates
        </p>
      </div>
      <HomePageCarousel workspaceId={workspaceId} />
    </>
  );
};

export default FeaturedTemplates;
