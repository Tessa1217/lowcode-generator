import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

export const InputMeta: ComponentMetaDefinition = {
  component: "Input",
  category: "Forms",
  description: "입력 필드",
  hasChildren: false,
  renderPreview: (Component, props) => <Component {...props} />,
  props: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
      default: "text",
      description: "입력 필드의 타입",
    },
    width: {
      control: "text",
      default: "100%",
      description: "요소의 기본 가로 길이",
    },
    inputSize: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "입력 필드의 크기",
    },
    disabled: {
      control: "boolean",
      default: false,
      description: "비활성화 여부",
    },
    placeholder: {
      control: "text",
      default: "입력해주세요.",
      description: "Input placeholder",
      required: false,
    },
  },
};
