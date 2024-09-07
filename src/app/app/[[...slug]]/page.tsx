import { Id } from "@convex/dataModel";
import Workspace from "./_workspace";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import dynamic from "next/dynamic";

const Page = dynamic(() => import("./_page"), { ssr: false });

type Props = {};

const Home = ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  let workspaceId: string[] | undefined;
  let documentId: string | undefined;

  if (params?.slug?.length === 2) {
    // @ts-expect-error
    workspaceId = params.slug[0];
    documentId = params.slug[1];
  } else {
    workspaceId = params.slug;
    documentId = undefined;
  }

  if (documentId) {
    return (
      <div className="h-full w-full overflow-hidden">
        <Page id={documentId as Id<"pages">} />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100dvh-56px)]">
      <Workspace id={workspaceId as Id<"workspaces">[]} />
    </ScrollArea>
  );
};

export default Home;
