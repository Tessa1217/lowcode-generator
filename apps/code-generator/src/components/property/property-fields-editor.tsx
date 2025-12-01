import { type ComponentItem } from "../../registry";
import { ComponentPreview } from "../drag-and-drop/component-preview";
import { PropertyField } from "./property-field";
import { propertyFieldsScroll, noProperties } from "./property-editor.css";

interface PropertyFieldsProps extends ComponentItem {
  props: Record<string, unknown>;
  onPropsChange: (propName: string, value: unknown) => void;
}

export function PropertyFieldsEditor({
  meta,
  component,
  props,
  onPropsChange,
}: PropertyFieldsProps) {
  return (
    <>
      <ComponentPreview meta={meta} component={component} props={props} />
      <div className={propertyFieldsScroll}>
        {Object.keys(meta.props).length === 0 ? (
          <p className={noProperties}>No properties available</p>
        ) : (
          Object.entries(meta.props).map(([propName, propMeta]) => (
            <PropertyField
              key={propName}
              propName={propName}
              propMeta={propMeta}
              value={props[propName]}
              onChange={(value) => onPropsChange(propName, value)}
            />
          ))
        )}
      </div>
    </>
  );
}
