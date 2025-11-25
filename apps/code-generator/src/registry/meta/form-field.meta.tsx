import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { FormLabel, Input } from "@packages/ui";
import { type ComponentMetaDefinition } from "../types";

export const FormFieldMeta: ComponentMetaDefinition = {
  component: "FormField",
  category: "Forms",
  description: "폼 필드",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props}>
      {props.children || (
        <>
          <FormLabel htmlFor="input" required={false}>
            Label
          </FormLabel>
          <Input type="text" inputSize="md" placeholder="입력해주세요." />
        </>
      )}
    </Component>
  ),
  props: {
    spacing: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "Form Field 공간 크기",
    },
  },
};
