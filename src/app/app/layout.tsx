import Sidebar from "./_components/sidebar";
import WorkspaceHeader from "./_components/header";
import { Separator } from "@/components/shadcn-ui/separator";
import WorkspaceWrapper from "./_components/workspace-wrapper";
import SearchDialog from "@/features/workspaces/components/search-dialog";

type Props = {
  children: React.ReactNode;
};

const DashboardPage = async ({ children }: Props) => {
  return (
    <main className="flex h-full w-full overflow-hidden">
      <Sidebar />
      <div className="w-full py-2">
        <WorkspaceHeader />
        <Separator className="mt-1" />
        <WorkspaceWrapper>{children}</WorkspaceWrapper>
        <SearchDialog />
      </div>
    </main>
  );
};

export default DashboardPage;
