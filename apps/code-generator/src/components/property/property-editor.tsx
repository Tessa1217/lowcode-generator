import { getComponentMeta } from "../../registry";
import { type TreeNode } from "../../types";
import { PropertyField } from "./property-field";
import {
  propertyEditor,
  propertyEditorHeader,
  componentDescription,
  propertyFields,
} from "./property-editor.css";

interface PropertyEditorProps {
  node: TreeNode | null;
  onChange: (id: string, props: Record<string, unknown>) => void;
}

export function PropertyEditor({ node, onChange }: PropertyEditorProps) {
  if (!node) return null;

  const componentName = node.componentName;

  const currentProps = node.props;

  const meta = getComponentMeta(componentName);

  if (!meta) return null;

  const handlePropChange = (propName: string, value: unknown) => {
    const nextProps = {
      ...currentProps,
      [propName]: value,
    };
    onChange(node.id, nextProps);
  };

  return (
    <div className={propertyEditor({})}>
      {/* 헤더 개선 */}
      <div className={propertyEditorHeader}>
        <h3>{meta.component}</h3>
        {meta.description && (
          <p className={componentDescription}>{meta.description}</p>
        )}
      </div>

      {/* 속성 필드들 */}
      <div className={propertyFields}>
        {Object.entries(meta.props).map(([propName, propMeta]) => (
          <PropertyField
            key={propName}
            propName={propName}
            propMeta={propMeta}
            value={currentProps[propName]}
            onChange={(value) => handlePropChange(propName, value)}
          />
        ))}
      </div>
    </div>
  );
}
