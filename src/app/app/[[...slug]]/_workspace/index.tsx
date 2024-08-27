"use client";

import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import RecentlyVisited from "./recently-visited";
import { Check, Loader2Icon } from "lucide-react";
import { Timeline } from "./calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceStore } from "./current-workspace-store";
import { useQueryWithStatus } from "@/services/convex-query";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";
import FeaturedTemplates from "./featured-templates";

type Props = {
  id: Id<"workspaces">[];
};

const Workspace = ({ id }: Props) => {
  const { data: user } = useQueryWithStatus(api.user.query.getCurrentUser, {});
  const { workspaceId: storedId, setCurrentWorkspaceId } = useWorkspaceStore(
    (state) => state,
  );
  const { data: fetchedWorkspaceId, isPending } = useQueryWithStatus(
    api.workspaces.query.getMostCurrentWordspace,
    {},
  );

  const time = new Date().getHours();
  let greeting = "";
  if (time < 12) {
    greeting = "Good morning";
  } else if (time < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  // Determine the workspace ID to use
  const workspaceId = id?.[0] || storedId || fetchedWorkspaceId?._id;

  // Update the Zustand store if the workspace ID was fetched from the database
  useEffect(() => {
    if (fetchedWorkspaceId && !storedId) {
      setCurrentWorkspaceId(fetchedWorkspaceId._id);
    }
  }, [fetchedWorkspaceId, storedId, setCurrentWorkspaceId]);

  if (!user || !workspaceId) {
    return (
      <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-accent/10 shadow-lg backdrop-blur transition-all supports-[backdrop-filter]:bg-accent/10">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center space-y-12 pb-32 pt-12">
      <div className="flex items-center justify-center">
        <h2>{`${greeting}, ${user ? user.name : ""}`}</h2>
      </div>
      <div className="w-[65%] items-center space-y-3">
        {isPending ? (
          <div className="flex gap-3 sm:basis-1/2 md:basis-3 lg:basis-1/4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="size-52 w-full">
                <Skeleton className="h-full w-full" />
              </Card>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {workspaceId && (
              <motion.div
                key="recentlyVisited"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <RecentlyVisited workspaceId={workspaceId} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <div className="w-[65%] items-center space-y-3">
        <Timeline />
      </div>

      <div className="w-[65%] items-center space-y-3">
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-muted-foreground" />
          <p className="!mt-0 text-sm text-muted-foreground">My tasks</p>
        </div>
        <AnimatePresence>
          <motion.ul
            key="tasks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-3"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index}>
                <Card className="h-36 w-full">
                  <CardHeader>
                    <CardTitle>Task {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Task description</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      <div className="w-[65%] items-center space-y-3">
        <AnimatePresence>
          {isPending ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>Loading...</div>
            </motion.div>
          ) : (
            workspaceId && (
              <motion.div
                key="featuredTemplates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <FeaturedTemplates workspaceId={workspaceId} />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Workspace;
