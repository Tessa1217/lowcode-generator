import { useDroppable } from "@dnd-kit/core";
import { TreeRenderer } from "../drag-and-drop/tree-renderer";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useTreeStore } from "../../store/treeStore";
import { useZoomControl } from "../../hooks/useZoomControl";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { PropertyEditor } from "../property/property-editor";
import { ZoomControl } from "./zoom-control";
import { HistoryControls } from "./history-controls";
import "./canvas-view.css";

export function CanvasView() {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-root",
    data: { type: "canvas-root", id: "canvas-root" },
  });

  const { tree } = useDragAndDrop();
  const { scale, handleWheel, zoomIn, zoomOut, resetZoom } = useZoomControl();
  const { selectedNode, updateNodeProps } = useTreeStore();
  useKeyboardShortcuts();

  const innerCanvasStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "top left",
    transition: "transform 0.1s ease-out",
  };

  return (
    <div className="canvas-view">
      <div
        ref={setNodeRef}
        onWheel={handleWheel}
        className={`component-canvas ${isOver ? "drag-over" : ""}`}
      >
        <div className="canvas-inner" style={innerCanvasStyle}>
          {tree.length === 0 ? (
            <div className="empty-canvas">Drag components from the palette</div>
          ) : (
            <TreeRenderer nodes={tree} />
          )}
        </div>
        <div className="canvas-toolbar">
          <HistoryControls />
          <ZoomControl
            scale={scale}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onReset={resetZoom}
          />
        </div>
      </div>
      <PropertyEditor node={selectedNode} onChange={updateNodeProps} />
    </div>
  );
}
