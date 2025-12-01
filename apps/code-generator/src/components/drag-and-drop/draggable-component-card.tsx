import { type MouseEvent } from "react";
import { useDraggable } from "@dnd-kit/core";
import { getDefaultProps } from "../../utils/getDefaultProps";
import { type ComponentProps, type ComponentItem } from "../../registry";
import {
  componentCard,
  componentCardName,
  miniPreview,
  thumbnail,
} from "../component-palette/component-palette.css";
import { ComponentPreview } from "./component-preview";

export interface ComponentCardProps extends ComponentItem {
  props?: ComponentProps;
  onClick?: () => void;
  isSelected?: boolean;
}

export function DraggableComponentCard({
  name,
  component,
  meta,
  onClick,
  isSelected,
}: ComponentCardProps) {
  const defaultProps = getDefaultProps(name);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-item-${name}`,
    data: {
      type: "palette-item",
      componentName: name,
      props: defaultProps,
      meta,
    },
  });

  const handleClick = (e: MouseEvent) => {
    if (!isDragging && onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div
      className={componentCard({ isDragging, isSelected })}
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.3 : 1 }}
      onClick={handleClick}
      {...listeners}
      {...attributes}
    >
      {/* 미니 프리뷰 - 실제로 렌더링 */}
      <div className={thumbnail()}>
        <div className={miniPreview}>
          <ComponentPreview
            component={component}
            meta={meta}
            props={defaultProps}
          />
        </div>
      </div>
      <span className={componentCardName}>{meta.component}</span>
    </div>
  );
}
