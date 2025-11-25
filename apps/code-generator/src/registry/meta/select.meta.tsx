import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

export const SelectMeta: ComponentMetaDefinition = {
  component: "Select",
  category: "Forms",
  description: "선택 필드",
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
    options: {
      control: "json",
      default: [
        { value: "1", label: "option 1" },
        { value: "2", label: "option 2" },
      ],
      description: "옵션 필드",
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
    label: {
      control: "text",
      default: "",
      description: "Select(선택 필드) 레이블",
      required: false,
    },
  },
};
