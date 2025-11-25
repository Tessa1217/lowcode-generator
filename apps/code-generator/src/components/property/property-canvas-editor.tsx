import { Plus } from "lucide-react";
import { getComponentItem, type ComponentName } from "../../registry";
import { getDefaultProps } from "../../utils/getDefaultProps";
import { useAddNewComponent } from "../../hooks/useAddNewComponent";
import { PropertyInfo } from "./property-info";
import { PropertyFieldsEditor } from "./property-fields-editor";
import "./property-canvas-editor.css";

interface PropertyCanvasEditorProps {
  componentName: ComponentName;
  onClose: () => void;
}

export function PropertyCanvasEditor({
  componentName,
  onClose,
}: PropertyCanvasEditorProps) {
  const { meta, component } = getComponentItem(componentName);
  const defaultProps = getDefaultProps(componentName);

  const { componentProps, handleComponentPropsChange, addNewComponent } =
    useAddNewComponent(defaultProps);

  if (!meta) return null;

  const handleAddComponent = () => {
    addNewComponent(componentName, componentProps);
    onClose();
  };

  return (
    <div className="property-canvas-editor-overlay" onClick={onClose}>
      <div
        className="property-canvas-editor-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <PropertyInfo meta={meta} onClose={onClose} />
        <PropertyFieldsEditor
          name={componentName}
          meta={meta}
          component={component}
          props={componentProps}
          onPropsChange={handleComponentPropsChange}
        />
        <div className="property-canvas-editor-footer">
          <button className="add-component-button" onClick={handleAddComponent}>
            <Plus /> <span>Add Component</span>
          </button>
        </div>
      </div>
    </div>
  );
}
