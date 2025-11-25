import { SECTION_SPACING_SCALE } from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

export const SectionMeta: ComponentMetaDefinition = {
  component: "Section",
  category: "Layout",
  description: "섹션",
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
        <p>Section Content</p>
      </div>
    </Component>
  ),
  props: {
    spacingScale: {
      control: "select",
      options: [...SECTION_SPACING_SCALE],
      default: "md",
      description: "Section Spacing 스케일 (padding, margin)",
    },
  },
};
