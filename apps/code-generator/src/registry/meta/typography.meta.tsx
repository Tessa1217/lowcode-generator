import { TYPOGRAPHY_ROLES } from "@packages/vanilla-extract-config";
import { TYPOGRAPHY_ELEMENT } from "@packages/ui";
import { type ComponentMetaDefinition } from "../types";

export const TypographyMeta: ComponentMetaDefinition = {
  component: "Typography",
  category: "Display",
  description: "타이포그래피",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props}>{props.children || "Typography"}</Component>
  ),
  props: {
    as: {
      control: "select",
      options: [...TYPOGRAPHY_ELEMENT],
      default: "h1",
      description: "타이포그래피 마크업 태그 요소",
    },
    role: {
      control: "select",
      options: [...TYPOGRAPHY_ROLES],
      default: "headingXxl",
      description: "타이포그래피 역할과 scale",
    },
    children: {
      control: "json",
      default: "타이포그래피",
      description: "타이포그래피 내부 요소",
    },
  },
};
