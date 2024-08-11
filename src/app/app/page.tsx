import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

type Props = {};

const DashboardPage = async (props: Props) => {
  const session = await auth();
  return (
    <div>
      <h1>DashboardPage</h1>
      <code>{JSON.stringify(session)}</code>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Sign out</Button>
      </form>
    </div>
  );
};

export default DashboardPage;
