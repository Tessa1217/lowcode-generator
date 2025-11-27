import { X } from "lucide-react";
import { type ComponentMeta } from "../../registry";

interface PropertyInfoProps {
  meta: ComponentMeta;
  onClose: () => void;
}

export function PropertyInfo({ meta, onClose }: PropertyInfoProps) {
  return (
    <div className="property-canvas-editor-header">
      <div className="header-content">
        <h3>{meta.component}</h3>
        <button className="close-button" onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      {meta.description && (
        <p className="component-description">{meta.description}</p>
      )}
    </div>
  );
}
