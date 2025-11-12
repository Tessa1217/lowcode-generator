import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../../types/meta";

export const FormLabelMeta: ComponentMetaDefinition = {
  component: "FormLabel",
  category: "Forms",
  description: "폼 라벨",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props}>{props.children || "Label"}</Component>
  ),
  props: {
    htmlFor: {
      control: "text",
      default: "input",
      description: "라벨의 for 속성",
      required: true,
    },
    labelSize: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "Form Label 텍스트 크기",
    },
    required: {
      control: "boolean",
      default: false,
      description: "필수 필드 여부",
    },
    children: {
      control: "json",
      default: "Label",
      description: "라벨 텍스트",
    },
  },
};
