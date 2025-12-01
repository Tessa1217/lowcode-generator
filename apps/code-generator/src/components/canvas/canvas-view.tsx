import { useDroppable } from "@dnd-kit/core";
import { TreeRenderer } from "../drag-and-drop/tree-renderer";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useTreeStore } from "../../store/treeStore";
import { useZoomControl } from "../../hooks/useZoomControl";
import { useCanvasMove } from "../../hooks/useCanvasMove";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { PropertyEditor } from "../property/property-editor";
import { ZoomControl } from "./zoom-control";
import { HistoryControls } from "./history-controls";
import {
  canvasView,
  componentCanvas,
  canvasInner,
  canvasToolbar,
} from "./canvas-view.css";

export function CanvasView() {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-root",
    data: { type: "canvas-root", id: "canvas-root" },
  });

  const { tree } = useDragAndDrop();
  const { scale, handleWheel, zoomIn, zoomOut, resetZoom } = useZoomControl();
  const { selectedNode, updateNodeProps } = useTreeStore();
  useKeyboardShortcuts();
  const {
    dragging,
    offset,
    panMode,
    togglePanMode,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  } = useCanvasMove();

  return (
    <div className={canvasView}>
      <div
        ref={setNodeRef}
        onWheel={handleWheel}
        className={componentCanvas({ isOver, panMode, dragging })}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <div
          className={canvasInner({ panMode, dragging })}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          }}
        >
          <TreeRenderer nodes={tree} panMode={panMode} />
        </div>
      </div>
      <div className={canvasToolbar}>
        <HistoryControls />
        <ZoomControl
          panMode={panMode}
          onPanToggle={togglePanMode}
          scale={scale}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={resetZoom}
        />
      </div>
      <PropertyEditor node={selectedNode} onChange={updateNodeProps} />
    </div>
  );
}
