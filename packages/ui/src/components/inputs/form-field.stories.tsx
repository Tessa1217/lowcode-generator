import type { Meta, StoryObj } from "@storybook/react";
import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { Input } from "../inputs/input";
import { Stack } from "../layout/stack";
import { FormField } from "./form-field";
import { FormLabel } from "./form-label";

const meta = {
  title: "Form/FormField",
  component: FormField,
  argTypes: {
    spacing: {
      control: "radio",
      options: SIZE_VARIANTS,
    },
  },
  args: {
    spacing: "md",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <FormField {...args}>
      <FormLabel>Email</FormLabel>
      <Input type="email" placeholder="you@example.com" />
    </FormField>
  ),
};

export const FormFieldSpacing: Story = {
  render: (_) => (
    <Stack direction="column" gap="xl">
      {SIZE_VARIANTS.map((spacing) => (
        <FormField key={spacing} spacing={spacing}>
          <FormLabel>{spacing}</FormLabel>
          <Input placeholder={`${spacing} spacing`} />
        </FormField>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "FormField의 `spacing` props를 변경하면 내부 요소 간 간격을 조절할 수 있습니다.",
      },
    },
  },
};

export const CompleteExample: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      <FormField {...args}>
        <FormLabel required>Full Name</FormLabel>
        <Input placeholder="John Doe" />
      </FormField>

      <FormField {...args}>
        <FormLabel required>Email</FormLabel>
        <Input type="email" placeholder="you@example.com" />
      </FormField>

      <FormField {...args}>
        <FormLabel required>Password</FormLabel>
        <Input type="password" placeholder="••••••••" />
      </FormField>

      <FormField {...args}>
        <FormLabel>Bio</FormLabel>
        <Input placeholder="Tell us about yourself..." />
      </FormField>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "완전한 폼 예시: Label, Input, Description, Message를 모두 포함합니다.",
      },
    },
  },
};
