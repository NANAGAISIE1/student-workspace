import { Id } from "@convex/dataModel";
import Workspace from "./_workspace";
import { ScrollArea } from "@/components/ui/scroll-area";
import Page from "./_page";

type Props = {};

const Home = ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  let workspaceId: string[] | undefined;
  let documentId: string[] | undefined;

  if (params?.slug?.length === 2) {
    // @ts-expect-error
    workspaceId = params.slug[0];
    // @ts-expect-error
    documentId = params.slug[1];
  } else {
    workspaceId = params.slug;
    documentId = undefined;
  }

  if (documentId) {
    return (
      <ScrollArea className="h-[calc(100dvh-56px)]">
        <Page id={documentId as Id<"pages">[]} />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[calc(100dvh-56px)]">
      <Workspace id={workspaceId as Id<"workspaces">[]} />
    </ScrollArea>
  );
};

export default Home;
