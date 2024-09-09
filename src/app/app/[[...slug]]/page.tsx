import { Id } from "@convex/dataModel";
import Workspace from "./_workspace";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import dynamic from "next/dynamic";
import { fetchQuery } from "convex/nextjs";
import { api } from "@convex/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { redirect } from "next/navigation";
import { Loader2Icon } from "lucide-react";

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

  const user = fetchQuery(
    api.user.query.getCurrentUser,
    {},
    { token: convexAuthNextjsToken() },
  );

  if (user === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <Loader2Icon className="h-8 w-8 animate-spin" />
        <p>Loading workspace</p>
      </div>
    );
  }

  if (user === null) {
    redirect("/login");
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
