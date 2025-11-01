import { DragOverlay } from "@dnd-kit/core";
import {
  ComponentRegistry,
  type ComponentName,
  type ComponentRegistryItem,
} from "@packages/ui";
import { type TreeNode } from "../../types";

export function DragComponentOverlay({
  activeDrag,
}: {
  activeDrag: TreeNode | null;
}) {
  if (!activeDrag) return null;
  return (
    <DragOverlay>
      {activeDrag
        ? (() => {
            const item = ComponentRegistry[
              activeDrag.componentName as ComponentName
            ] as ComponentRegistryItem;
            if (!item) return null;
            const { component: Component, meta } = item;
            const props = activeDrag.props;

            if (meta.renderPreview) {
              return meta.renderPreview(Component, props);
            }
            if (meta.hasChildren) {
              return <Component {...props}>Preview</Component>;
            }
            return <Component {...props} />;
          })()
        : null}
    </DragOverlay>
  );
}
