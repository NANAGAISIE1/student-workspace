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
import { api } from "@convex/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonalWorkspaces } from "./workspaces/personal-workspace";
import { SharedWorkspaces } from "./workspaces/shared-workspaces";
import { useRouter } from "next/navigation";
import { useQueryWithStatus } from "@/services/convex-query";
import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileMenu() {
  const { signOut } = useAuthActions();
  const { data: user, isPending: userPending } = useQueryWithStatus(
    api.user.query.getCurrentUser,
    {},
  );
  const router = useRouter();
  const { data: workspaces, isPending: workspacePending } = useQueryWithStatus(
    api.workspaces.query.getAllUserWorkspaces,
    {},
  );

  return (
    <>
      {userPending ? (
        <Button
          variant="ghost"
          size={"sm"}
          className="hover:bg-background-lighter justify-start pr-0 flex-1 flex items-center truncate space-x-2"
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
                className="hover:bg-background-lighter justify-start pr-0 flex-1 flex items-center truncate space-x-2"
              >
                <Avatar className="h-6 w-6 rounded-lg">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <p className="!mt-0">{user.name}</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 ml-6">
              <div className="flex justify-between items-center">
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
              {workspacePending ? (
                <DropdownMenuItem className="flex justify-start items-center space-x-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </DropdownMenuItem>
              ) : (
                workspaces && (
                  <>
                    <PersonalWorkspaces
                      personalWorkspace={workspaces.personal}
                      user={user}
                    />
                    <DropdownMenuSeparator />
                    <SharedWorkspaces
                      sharedWorkspace={workspaces.shared}
                      user={user}
                    />
                  </>
                )
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
