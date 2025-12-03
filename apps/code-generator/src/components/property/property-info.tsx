import { X } from "lucide-react";
import { type ComponentMeta } from "../../registry";
import {
  propertyEditorHeader,
  propertyHeaderContent,
  closeButton,
  componentDescription,
} from "./property-editor.css";

interface PropertyInfoProps {
  meta: ComponentMeta;
  onClose: () => void;
}

export function PropertyInfo({ meta, onClose }: PropertyInfoProps) {
  return (
    <div className={propertyEditorHeader}>
      <div className={propertyHeaderContent}>
        <h3>{meta.component}</h3>
        <button className={closeButton} onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      {meta.description && (
        <p className={componentDescription}>{meta.description}</p>
      )}
    </div>
  );
}
