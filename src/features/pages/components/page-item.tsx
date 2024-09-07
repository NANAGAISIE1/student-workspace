import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon, File, PlusIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { PageItemActions } from "@/features/pages/components/actions/item-actions";
import { PageItemProps } from "../types/page-list";
import Hints from "@/components/hints";
import { usePage } from "../hooks/use-page";

export const PageItem: React.FC<PageItemProps> = ({
  node,
  level,
  workspaceId,
  allPages,
  isFavoriteSection = false,
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const { createPage } = usePage();

  useEffect(() => {
    const storedExpanded = localStorage.getItem(`expanded_${node._id}`);
    if (storedExpanded) {
      setExpanded(JSON.parse(storedExpanded));
    }
  }, [node._id]);

  useEffect(() => {
    localStorage.setItem(`expanded_${node._id}`, JSON.stringify(expanded));
  }, [expanded, node._id]);

  const onExpand = (pageId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [pageId]: !prevExpanded[pageId],
    }));
  };

  const pathname = usePathname();
  const isActive = pathname === `/app/${workspaceId}/${node._id}`;
  const childPages = allPages.filter((page) => page.parentId === node._id);
  const hasChildren = childPages.length > 0;

  return (
    <li className="w-full">
      <span
        className={cn(
          "group flex items-center justify-between rounded-md py-1 hover:bg-accent/50",
          isActive && "bg-accent/50 text-accent-foreground",
        )}
        style={{
          paddingLeft: `${level * 12 + 4}px`,
        }}
      >
        <Button
          variant="ghost"
          size="sm"
          className={cn("p-1", !hasChildren && "invisible")}
          onClick={() => onExpand(node._id)}
        >
          <motion.span
            animate={{ rotate: expanded[node._id] ? 90 : 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="flex"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </motion.span>
        </Button>

        <Link
          href={`/app/${workspaceId}/${node._id}`}
          className={cn(
            "flex flex-grow items-center space-x-2 rounded-md py-1",
            isActive && "font-medium",
          )}
        >
          {node.emoji ? (
            <span>{node.emoji}</span>
          ) : (
            <File className="h-4 w-4 text-muted-foreground" />
          )}
          <span className={cn("text-sm", hasChildren && "font-semibold")}>
            {node.title}
          </span>
        </Link>
        <div className="flex items-center pr-2">
          <PageItemActions nodeId={node._id} workspaceId={workspaceId} />
          {!isFavoriteSection && (
            <Hints
              message="Add a page inside"
              className="text-xs"
              side="bottom"
              align="center"
            >
              <Button
                variant="ghost"
                size="sm"
                className="p-2 opacity-0 group-hover:opacity-100"
                onClick={() => createPage(workspaceId, node._id)}
              >
                <PlusIcon className="size-4" />
              </Button>
            </Hints>
          )}
        </div>
      </span>

      <AnimatePresence>
        {expanded[node._id] && hasChildren && !isFavoriteSection && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="mt-1 overflow-hidden"
          >
            {childPages.map((childNode) => (
              <PageItem
                key={childNode._id}
                node={childNode}
                level={level + 1}
                workspaceId={workspaceId}
                allPages={allPages}
                isFavoriteSection={isFavoriteSection}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
