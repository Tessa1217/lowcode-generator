import { Eraser, PlusCircle, MinusCircle } from "lucide-react";
import { zoomControl, zoomButton, zoomLevel } from "./canvas-view.css";

interface ZoomControlProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControl({
  scale,
  onZoomIn,
  onZoomOut,
  onReset,
}: ZoomControlProps) {
  console.log(zoomControl);

  return (
    <div className={zoomControl}>
      <button
        className={zoomButton}
        onClick={onZoomIn}
        title="Zoom in"
        aria-label="Zoom in"
      >
        <PlusCircle size={18} />
      </button>
      <span className={zoomLevel}>{Math.round(scale * 100)}%</span>
      <button
        className={zoomButton}
        onClick={onZoomOut}
        title="Zoom out"
        aria-label="Zoom out"
      >
        <MinusCircle size={18} />
      </button>

      <button
        className={zoomButton}
        onClick={onReset}
        title="Reset zoom"
        aria-label="Reset zoom"
      >
        <Eraser size={18} />
      </button>
    </div>
  );
}
