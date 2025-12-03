import { type ComponentMetaDefinition } from "../types";

export const CardMeta: ComponentMetaDefinition = {
  component: "Card",
  category: "UI",
  description: "카드 컨테이너",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props}>{props.children || "Card Content"}</Component>
  ),
  props: {
    variant: {
      control: "select",
      options: ["default", "outlined", "elevated"],
      default: "default",
      description: "카드 스타일",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      default: "md",
      description: "내부 패딩",
    },
  },
};
