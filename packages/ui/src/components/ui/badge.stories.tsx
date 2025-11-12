import type { Meta, StoryObj } from "@storybook/react";
import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { BADGE_COLOR_VARIANTS, BADGE_SHAPES } from "./badge.css";
import { Badge } from "./badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  argTypes: {
    color: {
      control: "select",
      options: BADGE_COLOR_VARIANTS,
      description: "뱃지 색상",
    },
    shape: {
      control: "select",
      options: BADGE_SHAPES,
      description: "뱃지 모양",
    },
    size: {
      control: "radio",
      options: SIZE_VARIANTS,
      description: "뱃지 크기",
    },
  },
  decorators: (stories) => (
    <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
      {stories()}
    </div>
  ),
  args: {
    color: "brand",
    shape: "default",
    size: "md",
    children: "Badge",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "brand",
    size: "md",
    children: "Badge",
  },
};

export const ColorButtons: Story = {
  render: (args) => (
    <>
      {BADGE_COLOR_VARIANTS.map((color) => (
        <Badge key={color} {...args} color={color}>
          {color}
        </Badge>
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge의 `color` props를 변경하면 type에 맞는 색상의 뱃지를 생성할 수 있습니다.",
      },
    },
  },
  args: {
    ...Primary.args,
  },
};

export const SizeBadges: Story = {
  render: (args) => (
    <>
      {SIZE_VARIANTS.map((size) => (
        <Badge key={size} {...args} size={size}>
          {args.children}
        </Badge>
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge의 `size` props를 변경하면 size에 맞는 크기의 Badge를 생성할 수 있습니다.",
      },
    },
  },
  args: {
    ...Primary.args,
  },
};

export const ShapedBadges: Story = {
  render: (args) => (
    <>
      {BADGE_SHAPES.map((shape) => (
        <Badge key={shape} {...args} shape={shape}>
          {args.children}
        </Badge>
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge의 `size` props를 변경하면 size에 맞는 크기의 Badge를 생성할 수 있습니다.",
      },
    },
  },
  args: {
    ...Primary.args,
    children: "Badge",
  },
};
