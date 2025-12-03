import type { TreeNode } from "../types";
import { useState } from "react";
import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { getComponentMeta } from "../registry";
import { createNode } from "../utils/treeHelper";
import { useTreeStore } from "../store/treeStore";

export function useDragAndDrop() {
  const [activeDrag, setActiveDrag] = useState<TreeNode | null>(null);
  const {
    tree,
    insertIntoContainer,
    removeNodeById,
    setSelectedNode,
    insertNodeBefore,
    insertNodeAfter,
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

      const newNode = createNode(data.componentName, data.props);

      if (canNest) {
        insertIntoContainer(targetNodeId, newNode);
      } else if (direction === "before") {
        insertNodeBefore(newNode, targetNodeId);
      } else {
        insertNodeAfter(newNode, targetNodeId);
      }

      setSelectedNode(newNode);
    }

    if (activeType === "tree-node") {
      const [, removedNode] = removeNodeById(active.id as string);
      if (!removedNode) return;

      if (canNest) {
        insertIntoContainer(targetNodeId, removedNode);
      } else if (direction === "before") {
        insertNodeBefore(removedNode, targetNodeId);
      } else {
        insertNodeAfter(removedNode, targetNodeId);
      }

      setSelectedNode(removedNode);
    }
  };

  return {
    activeDrag,
    tree,
    handleDragStart,
    handleDragEnd,
  };
}
