import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../../types/meta";

export const FormFieldMeta: ComponentMetaDefinition = {
  component: "FormField",
  category: "Forms",
  description: "폼 필드",
  hasChildren: true,
  // renderPreview: (Component, props) => <Component {..props}></Component>,
  props: {
    spacing: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "Form Field 공간 크기",
    },
  },
  scaffold: `
    <FormField>
      <FormLabel>Label</FormLabel>
      <Input placeholder="Enter value..." />
    </FormField>
  `,
};
