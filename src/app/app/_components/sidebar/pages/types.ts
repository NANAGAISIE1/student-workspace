export type NodeId = string;

export type Node = {
  id: NodeId;
  name?: string;
  emoji?: string;
  children?: Node[];
  parentId?: NodeId;
};

export interface FlatNode extends Omit<Node, "children"> {
  children?: NodeId[];
}

export type SidebarItemProps = {
  nodeId: NodeId;
  workspace: string;
  allNodes: Record<NodeId, FlatNode>;
};

export type WorkspacePagesProps = {
  data: Node[];
  workspace: string;
};
