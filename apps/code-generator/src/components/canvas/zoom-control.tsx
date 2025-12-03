import { Eraser, PlusCircle, MinusCircle, HandGrabIcon } from "lucide-react";
import {
  zoomControl,
  zoomButton,
  zoomLevel,
  panButton,
} from "./canvas-view.css";

interface ZoomControlProps {
  scale: number;
  panMode: boolean;
  onPanToggle: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControl({
  scale,
  panMode,
  onPanToggle,
  onZoomIn,
  onZoomOut,
  onReset,
}: ZoomControlProps) {
  console.log(zoomControl);

  return (
    <div className={zoomControl}>
      <button
        className={panButton({ active: panMode })}
        onClick={onPanToggle}
        title="Grab"
        aria-label="Grab"
      >
        <HandGrabIcon size={18} />
      </button>
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
