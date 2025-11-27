import { type ComponentMetaDefinition } from "../types";

export const DividerMeta: ComponentMetaDefinition = {
  component: "Divider",
  category: "UI",
  description: "Divider (구분선)",
  hasChildren: false,
  renderPreview: (Component, props) => (
    <div>
      <p>item</p>
      <Component {...props} />
      <p>item</p>
    </div>
  ),
  props: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      default: "horizontal",
      description: "구분선 방향",
    },
    variant: {
      control: "radio",
      options: ["solid", "dashed"],
      default: "solid",
      description: "구분선 변형",
    },
    color: {
      control: "radio",
      options: ["default", "subtle"],
      default: "default",
      description: "구분선 색상",
    },
  },
};
