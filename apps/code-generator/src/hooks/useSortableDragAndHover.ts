import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getComponentMeta } from "../registry";
import { type TreeNode } from "../types";
import { useTreeStore } from "../store/treeStore";

export const useSortableDragAndHover = (rootNode: TreeNode) => {
  const { hoveredNodeId, setHoveredNode } = useTreeStore();

  const meta = getComponentMeta(rootNode.componentName);
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
    active,
  } = useSortable({
    id: rootNode.id,
    data: {
      type: "tree-node",
      componentName: rootNode.componentName,
      props: rootNode.props,
      meta: meta,
      rootNode,
      canHaveChildren: meta?.hasChildren,
    },
  });

  // action쪽 hover 시 기존 노드에서 벗어나서 버튼 hover 풀리는 효과로 인해 action hover에 대해서 관리 필요
  const [isActionsHovered, setIsActionsHovered] = useState(false);

  const isHovered = hoveredNodeId === rootNode.id;
  const effectiveHover = isHovered || isActionsHovered;

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const showDropIndicator = isOver && active && active.id !== rootNode.id;

  /**
   * Mouse Down시 바로 drag and drop 모드가 되지 않도록 stop propagation
   * @param e
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;

    // 드래그 핸들이나 그 내부 요소인 경우 통과
    if (el.closest(".tree-node-drag-handle")) {
      return; // stopPropagation 하지 않음
    }

    if (
      el.tagName === "INPUT" ||
      el.tagName === "BUTTON" ||
      el.tagName === "TEXTAREA" ||
      el.closest("input") ||
      el.closest("button")
    ) {
      e.stopPropagation();
    }
  };

  const handleMouseEnter = () => {
    setHoveredNode(rootNode.id);
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  return {
    setIsActionsHovered,
    effectiveHover,
    dragProps: {
      ref: setSortableRef,
      setActivatorNodeRef,
      attributes,
      listeners,
      style: { position: "relative" as const, ...dragStyle },
      isDragging,
      showDropIndicator,
    },
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
  };
};
