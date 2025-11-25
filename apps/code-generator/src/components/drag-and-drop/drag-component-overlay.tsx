import { DragOverlay } from "@dnd-kit/core";
import {
  ComponentRegistry,
  type ComponentName,
  type ComponentRegistryItem,
} from "../../registry";
import { type TreeNode } from "../../types";
import { ComponentPreview } from "./component-preview";

export function DragComponentOverlay({
  activeDrag,
}: {
  activeDrag: TreeNode | null;
}) {
  if (!activeDrag) {
    return null;
  }

  const item = ComponentRegistry[
    activeDrag.componentName as ComponentName
  ] as ComponentRegistryItem;

  if (!item) return null;

  const { component, meta } = item;
  const props = activeDrag.props;

  return (
    <DragOverlay>
      <ComponentPreview component={component} meta={meta} props={props} />
    </DragOverlay>
  );
}
