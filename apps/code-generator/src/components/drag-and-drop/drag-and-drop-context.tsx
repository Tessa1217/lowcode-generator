import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { isInteractiveElement } from "../../utils/isInteractiveElement";
import { nestedDroppableCollision } from "../../utils/collisionDetection";
import { DragComponentOverlay } from "./drag-component-overlay";

/**
 * Drag and Drop 컨텍스트
 */
export function DragAndDropContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleDragStart, handleDragEnd, activeDrag } = useDragAndDrop();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 4, // 최소 이동 거리
    },
    eventListenerOptions: { capture: true },
    onPointerDown(event: React.PointerEvent) {
      const target = event.target as HTMLElement;

      if (isInteractiveElement(target)) {
        event.stopPropagation();
        return false; // drag candidate 등록 무시
      }

      return true;
    },
  });
  const touchSensor = useSensor(TouchSensor);

  return (
    <DndContext
      sensors={useSensors(mouseSensor, touchSensor)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={nestedDroppableCollision}
    >
      {children}
      <DragComponentOverlay activeDrag={activeDrag} />
    </DndContext>
  );
}
