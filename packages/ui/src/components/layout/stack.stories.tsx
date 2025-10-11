import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./stack";
import {
  STACK_ALIGNMENT,
  STACK_GAP,
  STACK_DIRECTION,
  STACK_JUSTIFICATION,
} from "@packages/vanilla-extract-config";

const meta = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "radio",
      options: STACK_DIRECTION,
      description: "Stack 배치 방향",
    },
    gap: {
      control: "select",
      options: STACK_GAP,
      description: "Stack 요소 사이 Gap",
    },
    justify: {
      control: "select",
      options: STACK_JUSTIFICATION,
      description: "메인 축(main axis) 요소 정렬",
    },
    align: {
      control: "select",
      options: STACK_ALIGNMENT,
      description: "횡축(cross axis) 요소 정렬",
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

const Item = ({ index }: { index: number }) => (
  <div
    style={{
      background: `hsl(${index * 40}, 70%, 70%)`,
      textAlign: "center",
      borderRadius: 8,
      padding: "8px 8px",
      fontWeight: 500,
    }}
  >
    items {index + 1}
  </div>
);

export const Primary: Story = {
  render: (args) => (
    <Stack
      direction={args.direction}
      gap={args.gap}
      justify={args.justify}
      align={args.align}
    >
      {[...Array(4)].map((_, i) => (
        <Item index={i} />
      ))}
    </Stack>
  ),
  args: {
    direction: "row",
    gap: "md",
    justify: "start",
    align: "center",
  },
  parameters: {
    docs: {
      description: {
        story: `기본 Stack 컴포넌트 예시입니다. \`direction\`, \`gap\`, \`justify\`, \`align\` props를 조합하여 요소의 배치 방향, 간격, 메인 축 정렬, 교차 축 정렬을 자유롭게 제어할 수 있습니다. default \`direction="row"\`, \`gap="md"\`, \`justify="start"\`, \`align="center"\` 입니다.`,
      },
    },
  },
};

export const StackDirections: Story = {
  render: (args) => (
    <div>
      <p>Row Direction</p>
      <Stack direction="row" gap={args.gap}>
        {[...Array(4)].map((_, i) => (
          <Item index={i} />
        ))}
      </Stack>
      <p>Col Direction</p>
      <Stack direction="column" gap={args.gap}>
        {[...Array(4)].map((_, i) => (
          <Item index={i} />
        ))}
      </Stack>
    </div>
  ),
  args: {
    gap: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Stack의 `direction` props를 통해 Stack의 배치 방향을 변경할 수 있습니다.",
      },
    },
  },
};

export const StackJustification: Story = {
  render: (args) => (
    <div>
      {STACK_JUSTIFICATION.map((justify) => (
        <>
          <p>
            <strong>{justify}</strong>
          </p>
          <Stack direction="row" gap={args.gap} justify={justify}>
            {[...Array(4)].map((_, i) => (
              <Item index={i} />
            ))}
          </Stack>
        </>
      ))}
    </div>
  ),
  args: {
    gap: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Stack의 `justify` props는 Stack의 메인 축(Main Axis) 정렬 방식을 제어합니다. (direction = 'row' 일 때는 가로 정렬, 'column'일 때는 세로 정렬에 적용)",
      },
    },
  },
};

export const StackAlignment: Story = {
  render: (args) => (
    <div>
      {STACK_ALIGNMENT.map((align) => (
        <>
          <p>
            <strong>{align}</strong>
          </p>
          <Stack direction="column" gap={args.gap} align={align}>
            {[...Array(2)].map((_, i) => (
              <Item index={i} />
            ))}
          </Stack>
        </>
      ))}
    </div>
  ),
  args: {
    gap: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Stack의 `align` props는 Stack의 교차 축(Cross Axis) 정렬 방식을 제어합니다. (direction = 'row' 일 때는 세로 정렬, 'column'일 때는 가로 정렬에 적용)",
      },
    },
  },
};
