import Sidebar from "./_components/sidebar";
import WorkspaceHeader from "./_components/header";
import { Separator } from "@/components/ui/separator";
import WorkspaceWrapper from "./_components/workspace-wrapper";
import SearchDialog from "./_components/dialogs/search-command-dialog";

type Props = {
  children: React.ReactNode;
};

const DashboardPage = async ({ children }: Props) => {
  return (
    <main className="flex h-full overflow-hidden w-full">
      <Sidebar />
      <div className="w-full">
        <WorkspaceHeader />
        <Separator />
        <WorkspaceWrapper>{children}</WorkspaceWrapper>
        <SearchDialog />
      </div>
    </main>
  );
};

export default DashboardPage;
