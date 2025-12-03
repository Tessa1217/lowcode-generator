import { Plus } from "lucide-react";
import { getComponentItem, type ComponentName } from "../../registry";
import { getDefaultProps } from "../../utils/getDefaultProps";
import { useAddNewComponent } from "../../hooks/useAddNewComponent";
import { PropertyInfo } from "./property-info";
import { PropertyFieldsEditor } from "./property-fields-editor";
import {
  editorFooter,
  editorOverlay,
  editorPanel,
  addComponentButton,
} from "./property-editor.css";

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
    <div className={editorOverlay} onClick={onClose}>
      <div className={editorPanel} onClick={(e) => e.stopPropagation()}>
        <PropertyInfo meta={meta} onClose={onClose} />
        <PropertyFieldsEditor
          name={componentName}
          meta={meta}
          component={component}
          props={componentProps}
          onPropsChange={handleComponentPropsChange}
        />
        <div className={editorFooter}>
          <button className={addComponentButton} onClick={handleAddComponent}>
            <Plus /> <span>Add Component</span>
          </button>
        </div>
      </div>
    </div>
  );
}
