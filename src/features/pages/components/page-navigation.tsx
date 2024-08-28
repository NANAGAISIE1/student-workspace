"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Doc } from "@convex/dataModel";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import { PageItem } from "./page-item";
import { usePage } from "../hooks/use-page";

const PageNavigation: React.FC<{
  data: Doc<"pages">[];
  title: string;
  isFavoriteSection?: boolean;
}> = ({ data, title, isFavoriteSection }) => {
  const { storedWorkspaceId: workspaceId } = usePage();
  const [open, setOpen] = useState<boolean>(() => {
    // Try to get the initial state from localStorage
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(
        `pageNavigation_${workspaceId}_${title}`,
      );
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  const rootPages = isFavoriteSection
    ? data
    : data.filter((page) => !page.parentId);

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    localStorage.setItem(
      `pageNavigation_${workspaceId}_${title}`,
      JSON.stringify(open),
    );
  }, [open, workspaceId, title]);

  if (!workspaceId) return null;

  return (
    <nav className="flex h-full w-full flex-col overflow-hidden">
      <span
        className={cn(
          "group flex items-center rounded-md py-1 hover:bg-accent",
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          className={cn("p-1", !data && "invisible")}
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="flex"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </motion.span>
        </Button>
        <p className="!mt-0 flex flex-grow items-center space-x-2 rounded-md py-1 text-sm font-semibold">
          {title}
        </p>
      </span>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="mt-1 overflow-hidden"
          >
            {rootPages.map((node) => (
              <PageItem
                key={node._id}
                allPages={data}
                node={node}
                level={0}
                workspaceId={workspaceId}
                isFavoriteSection={isFavoriteSection}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PageNavigation;
