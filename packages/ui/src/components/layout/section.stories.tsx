import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "./section";

const meta = {
  title: "Layout/Section",
  component: Section,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Section의 padding 및 margin 크기",
    },
    minHeight: {
      description: "Section 최소높이 (string 또는 number)",
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "md",
    minHeight: 100,
    style: { border: "1px solid black" },
    children: (
      <div
        style={{
          background: "#eaeaea",
          boxSizing: "border-box",
          padding: 20,
          width: "100%",
          height: "100%",
        }}
      >
        <p>Section</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Section은 페이지 내 주요 구획을 정의하며, 상하 여백(padding, margin)을 통해 구역 간 간격을 제공합니다.",
      },
    },
  },
};
