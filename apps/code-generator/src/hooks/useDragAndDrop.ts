import type { TreeNode } from "../types";
import { useState } from "react";
import { getComponentMeta } from "@packages/ui";
import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { parseScaffoldToTree } from "../utils/parseScaffoldToTree";
import { useTreeStore } from "../store/treeStore";

export function useDragAndDrop() {
  const [activeDrag, setActiveDrag] = useState<TreeNode | null>(null);
  const {
    tree,
    setTree,
    insertIntoContainer,
    findAndRemoveNode,
    findAndInsertBefore,
    findAndInsertNode,
  } = useTreeStore();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDrag(active.data.current as TreeNode);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDrag(null);
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overNodeData = over.data.current;

    if (!overNodeData) return;

    const direction = overNodeData?.direction ?? "after";
    const targetNodeId = overNodeData.nodeId || over.id;

    // nest 가능한 타입인지 확인
    const overMeta = getComponentMeta(overNodeData.componentName);
    const canNest =
      overNodeData.type === "canvas-root"
        ? true
        : overMeta?.hasChildren ?? false;

    if (activeType === "palette-item") {
      const data = active.data.current;
      if (!data) return;

      const meta = getComponentMeta(data.componentName);
      const parsedNode = meta?.scaffold
        ? parseScaffoldToTree(meta.scaffold)
        : null;

      const newNode: TreeNode = parsedNode
        ? parsedNode
        : {
            id: `node-${Date.now()}-${Math.random()}`,
            componentName: data.componentName,
            props: data.props,
            meta: getComponentMeta(data.componentName),
            children: [],
          };

      if (canNest) {
        insertIntoContainer(targetNodeId, newNode);
      } else if (direction === "before") {
        findAndInsertBefore(newNode, targetNodeId);
      } else {
        findAndInsertNode(newNode, targetNodeId);
      }
    }

    if (activeType === "tree-node") {
      const [, removedNode] = findAndRemoveNode(active.id as string);
      if (!removedNode) return;

      if (canNest) {
        insertIntoContainer(targetNodeId, removedNode);
      } else if (direction === "before") {
        findAndInsertBefore(removedNode, targetNodeId);
      } else {
        findAndInsertNode(removedNode, targetNodeId);
      }
    }

    const updatedTree = useTreeStore.getState().tree;
    setTree(updatedTree);
  };

  return {
    activeDrag,
    tree,
    handleDragStart,
    handleDragEnd,
  };
}
