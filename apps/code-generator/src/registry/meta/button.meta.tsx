import {
  COLOR_VARIANTS,
  SIZE_VARIANTS,
} from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

export const ButtonMeta: ComponentMetaDefinition = {
  component: "Button",
  category: "UI",
  description: "버튼",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props}>
      {props.children ? props.children : "Click Me"}
    </Component>
  ),
  props: {
    color: {
      control: "select",
      options: [...COLOR_VARIANTS],
      default: "primary",
      description: "버튼 색상",
    },
    size: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "버튼 크기",
    },
    fullWidth: {
      control: "boolean",
      default: false,
      description: "전체 넓이 여부",
    },
    children: {
      control: "json",
      default: "Button",
      description: "버튼 내부 요소",
    },
  },
};
