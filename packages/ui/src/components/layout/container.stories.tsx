import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./container";

const meta = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Container의 넓이",
    },
    minHeight: {
      description: "Container 높이 (string 또는 number)",
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "md",
    minHeight: 300,
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
        <p>Container Content</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Container는 콘텐츠의 최대 너비와 좌우 여백을 제어합니다. 일반적으로 페이지의 기본 래퍼로 사용됩니다.",
      },
    },
  },
};
