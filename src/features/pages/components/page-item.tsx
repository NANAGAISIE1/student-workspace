"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon, File } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FlatNode, NodeId, SidebarItemProps } from "../types/page-list";
import { PageItemActions } from "@/app/app/_components/sidebar/pages/actions/item-actions";

// Helper function to calculate level
const calculateLevel = (
  nodeId: NodeId,
  allNodes: Record<NodeId, FlatNode>,
): number => {
  let level = 0;
  let currentNodeId = nodeId;
  while (allNodes[currentNodeId].parentId) {
    level++;
    currentNodeId = allNodes[currentNodeId].parentId!;
  }
  return level;
};

export const PageItem: React.FC<SidebarItemProps> = ({
  nodeId,
  workspace,
  allNodes,
}) => {
  // const { isPageDropdownOpen, togglePageDropdown } = usePageStore(
  //   (state) => state,
  // );

  const [isPageDropdownOpen, togglePageDropdown] = useState(false);
  const pathname = usePathname();
  const node = allNodes[nodeId];
  const isActive = pathname === `/app/${workspace}/${node.id}`;
  const hasChildren = node.children && node.children.length > 0;
  const level = calculateLevel(nodeId, allNodes);

  return (
    <>
      {node.id && (
        <li className="w-full">
          <span
            className={cn(
              "group flex items-center rounded-md py-1 hover:bg-accent",
              isActive && "bg-accent text-accent-foreground",
            )}
            style={{ paddingLeft: `${level * 5}px` }}
          >
            <Button
              variant="ghost"
              size="sm"
              className={cn("p-1", !hasChildren && "invisible")}
              onClick={() => togglePageDropdown(!isPageDropdownOpen)}
            >
              <motion.span
                animate={{ rotate: isPageDropdownOpen ? 90 : 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="flex"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </motion.span>
            </Button>

            <Link
              href={`/app/${workspace}/${node.id}`}
              className={cn(
                "flex flex-grow items-center space-x-2 rounded-md py-1",
                isActive && "font-medium",
              )}
            >
              {node.emoji ? (
                <span>{node.emoji}</span>
              ) : (
                !hasChildren &&
                allNodes[0] && (
                  <File className="h-4 w-4 text-muted-foreground" />
                )
              )}
              {allNodes[0] ? (
                <p className="!mt-0 text-sm font-semibold">{node.name}</p>
              ) : (
                <span className="text-sm">{node.name}</span>
              )}
            </Link>
            {!hasChildren && (
              <PageItemActions nodeId={node.id} workspaceId={workspace} />
            )}
          </span>

          <AnimatePresence>
            {isPageDropdownOpen && hasChildren && (
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="mt-1 overflow-hidden"
              >
                {node.children?.map((childId) => (
                  <PageItem
                    key={childId}
                    nodeId={childId}
                    workspace={workspace}
                    allNodes={allNodes}
                  />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      )}
    </>
  );
};
