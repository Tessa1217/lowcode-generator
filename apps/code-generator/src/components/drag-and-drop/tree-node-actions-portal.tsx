import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  type DraggableAttributes,
  type DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { GripVertical, Trash2, MousePointer2 } from "lucide-react";
import { cn } from "@packages/ui";
import { type TreeNode } from "../../types";
import { useTreeStore } from "../../store/treeStore";
import {
  treeNodeButton,
  treeNodeActionsPortal,
  treeNodeDeleteButton,
  treeNodeDragHandle,
  treeNodeSelectButton,
} from "./tree-node.css";

interface TreeNodeActionsPortalProps {
  targetRef: React.RefObject<HTMLElement | null>;
  node: TreeNode;
  isHovered: boolean;
  componentName: string;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  dragAttributes?: DraggableAttributes;
  dragListeners?: DraggableSyntheticListeners;
  isDragging: boolean;
  onDelete?: () => void;
  onHoverChange?: (hovered: boolean) => void;
}

export function TreeNodeActionsPortal({
  targetRef,
  node,
  setActivatorNodeRef,
  isHovered,
  componentName,
  isDragging,
  dragAttributes,
  dragListeners,
  onDelete,
  onHoverChange,
}: TreeNodeActionsPortalProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPortalHovered, setIsPortalHovered] = useState(false);

  const { selectedNode, setSelectedNode } = useTreeStore();

  // 실제로 보여야 하는지 판단 (원본 또는 Portal이 hover 상태)
  const shouldShow = isHovered || isPortalHovered;

  // 선택 여부
  const isSelected = selectedNode?.id === node.id;

  const onSelect = () => setSelectedNode(node);

  useEffect(() => {
    const updatePosition = () => {
      if (targetRef.current && shouldShow) {
        const rect = targetRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY + rect.height / 2,
          left: rect.left - 14,
        });
      }
    };

    if (shouldShow && targetRef.current) {
      updatePosition();

      // ResizeObserver로 요소 크기 변화 감지
      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updatePosition);
      });
      resizeObserver.observe(targetRef.current);

      // MutationObserver로 DOM 변화 감지
      const mutationObserver = new MutationObserver(() => {
        requestAnimationFrame(updatePosition);
      });

      // 부모 요소의 변화도 감지
      const parentElement = targetRef.current.parentElement;
      if (parentElement) {
        mutationObserver.observe(parentElement, {
          attributes: true,
          childList: true,
          subtree: false,
        });
      }

      // RAF로 지속적 업데이트 (드래그나 애니메이션 대응)
      let rafId: number;
      const continuousUpdate = () => {
        updatePosition();
        rafId = requestAnimationFrame(continuousUpdate);
      };
      rafId = requestAnimationFrame(continuousUpdate);

      const handleScroll = () => requestAnimationFrame(updatePosition);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);

      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
        cancelAnimationFrame(rafId);
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [targetRef, shouldShow]);

  // Portal hover 상태 변경 시 부모에게 알림
  useEffect(() => {
    if (onHoverChange) {
      onHoverChange(isPortalHovered);
    }
  }, [isPortalHovered, onHoverChange]);

  if (!shouldShow) return null;

  return createPortal(
    <div
      className={treeNodeActionsPortal}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateY(-50%)",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
      onMouseEnter={() => setIsPortalHovered(true)}
      onMouseLeave={() => setIsPortalHovered(false)}
    >
      <button
        className={cn(
          treeNodeButton,
          treeNodeSelectButton({ selected: isSelected })
        )}
        onClick={onSelect}
        aria-label={`${componentName}선택`}
        title="선택"
      >
        <MousePointer2 />
      </button>
      {/* 드래그 핸들 */}
      <button
        ref={setActivatorNodeRef}
        className={cn(
          treeNodeButton,
          treeNodeDragHandle({ dragging: isDragging })
        )}
        {...dragAttributes}
        {...dragListeners}
        aria-label={`${componentName} 드래그`}
        title="드래그하여 이동"
      >
        <GripVertical />
      </button>
      {/* 삭제 버튼 */}
      {onDelete && (
        <button
          className={cn(treeNodeButton, treeNodeDeleteButton)}
          onClick={onDelete}
          aria-label={`${componentName} 삭제`}
          title="삭제"
        >
          <Trash2 />
        </button>
      )}
    </div>,
    document.body
  );
}
