"use client";
import { PlusSquareIcon, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/features/auth/api/users";
import { useWorkspace } from "@/features/workspaces/hooks/use-workspace";
import { toast } from "sonner";
import { WorkspaceSelector } from "./workspace-selector";

export function UserProfileMenu() {
  const { signOut } = useAuthActions();
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { getWorkspaces } = useWorkspace();
  const { isError, isPending, workspaces, error } = getWorkspaces();

  if (isError) {
    console.error(error);
    toast.error("Failed to fetch workspaces");
  }

  return (
    <>
      {isLoading ? (
        <Button
          variant="ghost"
          size={"sm"}
          className="flex flex-1 items-center justify-start space-x-2 truncate pr-0 hover:bg-background-lighter"
        >
          <Skeleton className="h-6 w-6 rounded-lg" />
          <Skeleton className="h-6 w-full" />
        </Button>
      ) : (
        user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size={"sm"}
                className="flex flex-1 items-center justify-start space-x-2 truncate pr-0 hover:bg-background-lighter"
              >
                <Avatar className="h-6 w-6 rounded-lg">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <p className="!mt-0">{user.name}</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-6 w-72">
              <div className="flex items-center justify-between">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <PlusSquareIcon className="h-4 w-4" />
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => router.push("/onboarding")}
                      >
                        <PlusSquareIcon className="mr-2 h-4 w-4" />
                        <span>Join or create workspace</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={async () => await signOut()}>
                        <XCircle className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </div>
              <DropdownMenuSeparator />
              {isPending ? (
                <DropdownMenuItem className="flex items-center justify-start space-x-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </DropdownMenuItem>
              ) : (
                workspaces &&
                workspaces.map((workspace) => (
                  <WorkspaceSelector
                    workspace={workspace}
                    user={user}
                    key={workspace._id}
                  />
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={async () => await signOut()}>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Get desktop app</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      )}
    </>
  );
}
