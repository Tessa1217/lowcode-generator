import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../display/typography";
import { CARD_PADDINGS, CARD_VARIANTS } from "./card.css";
import { Card } from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  argTypes: {
    variant: {
      control: "select",
      options: CARD_VARIANTS,
      description: "카드 Variant",
    },
    padding: {
      control: "select",
      options: CARD_PADDINGS,
      description: "카드 padding 크기",
    },
  },
  decorators: (stories) => (
    <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
      {stories()}
    </div>
  ),
  args: {
    variant: "default",
    padding: "md",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    padding: "md",
    children: (
      <>
        <Typography as="p" role="textLgSemibold">
          카드 헤더
        </Typography>
        <Typography as="p" role="textMdRegular">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </Typography>
      </>
    ),
  },
};

export const CardStyles: Story = {
  render: (args) => (
    <>
      {CARD_VARIANTS.map((variant) => (
        <Card key={variant} {...args} variant={variant}>
          {args.children}
        </Card>
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Card의 `varaint` props를 변경하면 type에 맞는 형태의 카드를 생성할 수 있습니다.",
      },
    },
  },
  args: {
    ...Primary.args,
  },
};

export const CardPaddings: Story = {
  render: (args) => (
    <>
      {CARD_PADDINGS.map((padding) => (
        <Card key={padding} {...args} padding={padding}>
          {args.children}
        </Card>
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Card의 `padding` props를 변경하면 padding 사이즈를 조정할 수 있습니다.",
      },
    },
  },
  args: {
    ...Primary.args,
  },
};
