import { useWorkspaceStore } from "@/app/app/[[...slug]]/_workspace/current-workspace-store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn-ui/avatar";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/shadcn-ui/dropdown-menu";
import { Doc } from "@convex/dataModel";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/utils";

interface WorkspaceSelector extends Doc<"workspaces"> {
  members: number;
}

export function WorkspaceSelector({
  workspace,
  user,
}: {
  workspace: WorkspaceSelector;
  user: Doc<"users">;
}) {
  const router = useRouter();
  const { setCurrentWorkspaceId, workspaceId } = useWorkspaceStore(
    (state) => state,
  );

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem
        className="flex items-center justify-between space-x-3"
        key={workspace._id}
        onClick={() => {
          setCurrentWorkspaceId(workspace._id);
          router.push(`/app/${workspace._id}`);
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
              {workspace.plan &&
                `${capitalizeFirstLetter(workspace.plan)} Plan •  ${workspace.members} member${workspace.members > 1 ? "s" : ""}`}
            </span>
          </div>
        </div>
        {workspaceId === workspace._id && <CheckIcon className="h-4 w-4" />}
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
