import { Id } from "@convex/dataModel";
import { preloadQuery } from "convex/nextjs";
import { api } from "@convex/api";
// import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";

type Props = {
  id: Id<"pages">;
};

const WorkspaceEditor = dynamic(() => import("./editor"), { ssr: false });
const ImageBanner = dynamic(() => import("./editor/image-banner"), {
  ssr: false,
});

const Page = async ({ id }: Props) => {
  const preloadedPage = await preloadQuery(
    api.pages.query.getPageById,
    {
      pageId: id,
    },
    // { token: convexAuthNextjsToken() },
  );

  return (
    <ScrollArea className="h-[calc(100dvh-56px)]">
      <div className="flex h-full w-full flex-col">
        <ImageBanner preloadedPage={preloadedPage} />
        <div className="relative h-full w-full items-center justify-center">
          <WorkspaceEditor preloadedPage={preloadedPage} />
        </div>
      </div>
    </ScrollArea>
  );
};

export default Page;
