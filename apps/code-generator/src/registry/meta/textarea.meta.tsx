import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

export const TextareaMeta: ComponentMetaDefinition = {
  component: "Textarea",
  category: "Forms",
  description: "텍스트박스",
  hasChildren: false,
  renderPreview: (Component, props) => <Component {...props} />,
  props: {
    inputSize: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "Textarea 입력 필드의 크기",
    },
    width: {
      control: "text",
      default: "100%",
      description: "요소의 기본 가로 길이",
    },
    rows: {
      control: "number",
      default: 3,
      description: "Textarea의 Row 수",
    },
    disabled: {
      control: "boolean",
      default: false,
      description: "비활성화 여부",
    },
    placeholder: {
      control: "text",
      default: "텍스트를 입력해주세요.",
      description: "Textarea placeholder",
      required: false,
    },
  },
};
