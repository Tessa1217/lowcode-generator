import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { BADGE_COLOR_VARIANTS, BADGE_SHAPES } from "@packages/ui";
import { type ComponentMetaDefinition } from "../types";

export const BadgeMeta: ComponentMetaDefinition = {
  component: "Badge",
  category: "UI",
  description: "상태 표시 뱃지",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props}>{props.children || "Badge"}</Component>
  ),
  props: {
    color: {
      control: "select",
      options: [...BADGE_COLOR_VARIANTS],
      default: "default",
      description: "뱃지 스타일",
    },
    size: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "뱃지 크기",
    },
    shape: {
      control: "select",
      options: [...BADGE_SHAPES],
      default: "default",
      description: "뱃지 형태",
    },
    children: {
      control: "text",
      default: "Badge",
      description: "뱃지 텍스트",
    },
  },
};
