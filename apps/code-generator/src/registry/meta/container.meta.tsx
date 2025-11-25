import { CONTAINER_WIDTH_SCALE } from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

export const ContainerMeta: ComponentMetaDefinition = {
  component: "Container",
  category: "Layout",
  description: "컨테이너",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props} style={{ border: "1px solid #121212" }}>
      {" "}
      <div
        style={{
          background: "#eaeaea",
          boxSizing: "border-box",
          padding: 20,
          width: "100%",
          height: "100%",
        }}
      >
        <p>Container Content</p>
      </div>
    </Component>
  ),
  props: {
    widthScale: {
      control: "select",
      options: [...CONTAINER_WIDTH_SCALE],
      default: "md",
      description: "Container 넓이 스케일",
    },
    minHeight: {
      control: "text",
      default: 100,
      description: "Container의 최소 높이",
    },
  },
};
