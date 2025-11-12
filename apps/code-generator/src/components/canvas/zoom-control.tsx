import { Eraser, PlusCircle, MinusCircle } from "lucide-react";

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
  return (
    <div className="zoom-control">
      <button onClick={onZoomIn}>
        <PlusCircle />
      </button>
      <span>{Math.round(scale * 100)}%</span>
      <button onClick={onZoomOut}>
        <MinusCircle />
      </button>
      <button onClick={onReset}>
        <Eraser />
      </button>
    </div>
  );
}
