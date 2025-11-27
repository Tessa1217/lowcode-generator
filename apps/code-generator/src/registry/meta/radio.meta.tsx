import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

export const RadioMeta: ComponentMetaDefinition = {
  component: "Radio",
  category: "Forms",
  description: "라디오",
  hasChildren: false,
  renderPreview: (Component, props) => <Component {...props} />,
  props: {
    inputSize: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "Radio 입력 필드의 크기",
    },
    disabled: {
      control: "boolean",
      default: false,
      description: "비활성화 여부",
    },
    label: {
      control: "text",
      default: "Radio Label",
      required: false,
      description: "라디오 Label",
    },
  },
};
