import { GRID_GAP, GRID_PADDING } from "@packages/vanilla-extract-config";
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

export const GridMeta: ComponentMetaDefinition = {
  component: "Grid",
  category: "Layout",
  description: "그리드",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props} container>
      {[...Array(4)].map((_, i) => (
        <Component key={i} size={1}>
          <Item key={`item_${i}`} index={i} />
        </Component>
      ))}
    </Component>
  ),
  props: {
    container: {
      control: "boolean",
      default: false,
      description: "Grid 컨테이너 여부",
    },
    columns: {
      control: "select",
      options: [2, 3, 4, 6, 8, 12],
      default: "4",
      description: "그리드의 총 컬럼 개수 (grid-template-columns)",
    },
    gap: {
      control: "select",
      options: [...GRID_GAP],
      default: "md",
      description: "그리드 셀 간격(Gap)",
    },
    padding: {
      control: "select",
      options: [...GRID_PADDING],
      default: "md",
      description: "컨테이너 내부 여백",
    },
  },
};
