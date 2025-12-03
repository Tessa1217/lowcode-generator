import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { treeViewComponent } from "./tree-view.css";

export type ComponentNodeData = {
  label: string;
  meta?: string;
  className?: string;
  props?: Record<string, unknown>;
};

export function ComponentNode({ data }: NodeProps<Node<ComponentNodeData>>) {
  return (
    <div className={treeViewComponent}>
      {data.label}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
