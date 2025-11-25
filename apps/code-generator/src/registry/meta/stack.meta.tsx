import {
  STACK_ALIGNMENT,
  STACK_GAP,
  STACK_DIRECTION,
  STACK_JUSTIFICATION,
} from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

const Item = ({ index }: { index: number }) => (
  <div
    style={{
      background: `hsl(${index * 40}, 70%, 70%)`,
      textAlign: "center",
      borderRadius: 8,
      padding: "8px 8px",
      fontWeight: 500,
    }}
  >
    items {index + 1}
  </div>
);

export const StackMeta: ComponentMetaDefinition = {
  component: "Stack",
  category: "Layout",
  description: "스택",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props}>
      {[...Array(3)].map((_, i) => (
        <Item key={`stack_item_${i}`} index={i} />
      ))}
    </Component>
  ),
  props: {
    direction: {
      control: "select",
      options: [...STACK_DIRECTION],
      default: "column",
      description: "Stack 배치 방향",
    },
    gap: {
      control: "select",
      options: [...STACK_GAP],
      default: "md",
      description: "Stack 요소 사이 Gap",
    },
    justify: {
      control: "select",
      options: [...STACK_JUSTIFICATION],
      default: "start",
      description: "메인 축(main axis) 요소 정렬",
    },
    align: {
      control: "select",
      options: [...STACK_ALIGNMENT],
      description: "횡축(cross axis) 요소 정렬",
      default: "center",
    },
  },
};
