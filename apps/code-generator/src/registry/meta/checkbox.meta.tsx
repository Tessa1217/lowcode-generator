import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

export const CheckboxMeta: ComponentMetaDefinition = {
  component: "Checkbox",
  category: "Forms",
  description: "체크박스",
  hasChildren: false,
  props: {
    inputSize: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "Checkbox 입력 필드의 크기",
    },
    disabled: {
      control: "boolean",
      default: false,
      description: "비활성화 여부",
    },
    label: {
      control: "text",
      default: "Checkbox Label",
      required: false,
      description: "체크박스 Label",
    },
  },
};
