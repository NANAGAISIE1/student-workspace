import { useWorkspaceStore } from "@/app/app/[[...slug]]/_workspace/current-workspace-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Doc } from "@convex/dataModel";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function PersonalWorkspaces({
  personalWorkspace,
  user,
}: {
  personalWorkspace: Doc<"workspaces">[];
  user: Doc<"users">;
}) {
  const router = useRouter();
  const { setCurrentWorkspaceId, workspaceId } = useWorkspaceStore(
    (state) => state,
  );

  return (
    <DropdownMenuGroup>
      {personalWorkspace.map((workspace) => (
        <DropdownMenuItem
          className="flex items-center justify-between space-x-3"
          key={workspace._id}
          onClick={() => {
            router.push(`/app/${workspace._id}`);
            setCurrentWorkspaceId(workspace._id);
          }}
        >
          <div className="flex items-center justify-start space-x-3">
            <Avatar className="h-9 w-9 rounded-lg">
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{workspace.name}</span>
              <span className="text-sm text-muted-foreground">
                {user?.plan}
              </span>
            </div>
          </div>
          {workspaceId === workspace._id && <CheckIcon className="h-4 w-4" />}
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  );
}
