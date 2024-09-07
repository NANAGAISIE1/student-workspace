import { Id } from "@convex/dataModel";
import { preloadQuery } from "convex/nextjs";
import { api } from "@convex/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import dynamic from "next/dynamic";
import ImageBanner from "./editor/image-banner";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";

type Props = {
  id: Id<"pages">;
};

const WorkspaceEditor = dynamic(() => import("./editor"), { ssr: false });

const Page = async ({ id }: Props) => {
  const preloadedPage = await preloadQuery(
    api.pages.query.getPageById,
    {
      pageId: id,
    },
    { token: convexAuthNextjsToken() },
  );

  return (
    <ScrollArea className="h-[calc(100dvh-56px)]">
      <div className="flex h-full w-full flex-col space-y-8">
        <ImageBanner />
        <div className="relative h-full w-full px-32">
          <WorkspaceEditor preloadedPage={preloadedPage} />
        </div>
      </div>
    </ScrollArea>
  );
};

export default Page;
