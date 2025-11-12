import type { Meta, StoryObj } from "@storybook/react";
import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { Stack } from "../layout/stack";
import { FormLabel } from "./form-label";

const meta = {
  title: "Form/FormLabel",
  component: FormLabel,
  argTypes: {
    labelSize: {
      control: "radio",
      options: SIZE_VARIANTS,
    },
    required: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    labelSize: "md",
    required: false,
    children: "Label",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Label",
  },
};

export const RequiredLabel: Story = {
  args: {
    children: "Required Field",
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`required` props를 true로 설정하면 빨간색 별표(*)가 표시됩니다.",
      },
    },
  },
};

export const LabelSizes: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      {SIZE_VARIANTS.map((size) => (
        <FormLabel key={size} {...args} labelSize={size}>
          {size} Label
        </FormLabel>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "FormLabel의 `labelSize` props를 변경하면 라벨의 크기를 조절할 수 있습니다.",
      },
    },
  },
};

export const LabelStates: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      <FormLabel {...args}>Default Label</FormLabel>
      <FormLabel {...args} required>
        Required Label
      </FormLabel>
      <FormLabel {...args} labelSize="sm">
        Small Label
      </FormLabel>
      <FormLabel {...args} labelSize="lg" required>
        Large Required Label
      </FormLabel>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "FormLabel의 다양한 크기와 required 상태 조합입니다.",
      },
    },
  },
};

export const WithHtmlFor: Story = {
  render: (args) => (
    <Stack direction="column" gap="md">
      <FormLabel {...args} htmlFor="email-input">
        Email Address
      </FormLabel>
      <input
        id="email-input"
        type="email"
        placeholder="you@example.com"
        style={{
          padding: "8px 12px",
          border: "1px solid #D1D5DB",
          borderRadius: "4px",
        }}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`htmlFor` props를 사용하여 라벨을 input과 연결할 수 있습니다. 라벨을 클릭하면 해당 input에 포커스됩니다.",
      },
    },
  },
};

export const LongLabelText: Story = {
  args: {
    children:
      "This is a very long label text that demonstrates how the label component handles longer content",
  },
  parameters: {
    docs: {
      description: {
        story: "긴 텍스트가 포함된 라벨의 표시 예시입니다.",
      },
    },
  },
};
