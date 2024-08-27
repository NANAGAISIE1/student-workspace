import {
  FlatNode,
  Node,
  NodeId,
  WorkspacePagesProps,
} from "../types/page-list";
import { PageItem } from "./page-item";

const PagesList = ({ data, workspace }: WorkspacePagesProps) => {
  // Convert the tree structure to a flat structure for efficient lookups
  const allNodes: Record<NodeId, FlatNode> = {};
  const topLevelNodes: NodeId[] = [];

  const flattenNodes = (nodes: Node[], parentId?: NodeId) => {
    nodes.forEach((node) => {
      const { children, ...nodeWithoutChildren } = node;
      allNodes[node.id] = {
        ...nodeWithoutChildren,
        parentId,
        children: children ? children.map((child) => child.id) : undefined,
      };
      if (!parentId) topLevelNodes.push(node.id);
      if (children) flattenNodes(children, node.id);
    });
  };

  flattenNodes(data);

  return (
    <ul className="m-0 list-none">
      {topLevelNodes.map((nodeId) => (
        <PageItem
          key={nodeId}
          nodeId={nodeId}
          workspace={workspace}
          allNodes={allNodes}
        />
      ))}
    </ul>
  );
};

export default PagesList;
