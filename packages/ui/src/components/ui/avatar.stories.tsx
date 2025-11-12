import type { Meta, StoryObj } from "@storybook/react";
import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { AVATAR_STATUS } from "./avatar.css";
import { Avatar } from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  argTypes: {
    src: {
      control: "text",
      description: "프로필 이미지 URL",
    },
    alt: {
      control: "text",
      description: "대체 텍스트",
    },
    size: {
      control: "select",
      options: SIZE_VARIANTS,
      description: "아바타 크기",
    },
    initials: {
      control: "text",
      description: "이미지 없을 때 표시할 이니셜",
    },
    status: {
      control: "select",
      options: AVATAR_STATUS,
      description: "상태 표시",
    },
  },
  decorators: (stories) => (
    <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
      {stories()}
    </div>
  ),
  args: {
    src: "https://placehold.co/400",
    alt: "User Avatar",
    size: "md",
    initials: "Avatar",
    status: "online",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: "https://placehold.co/400",
    alt: "User Avatar",
    size: "md",
    initials: "Avatar",
    status: "online",
  },
};

export const SizedAvatars: Story = {
  render: (args) => (
    <>
      {SIZE_VARIANTS.map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar의 `size` props를 변경하면 type에 맞는 크기의 아바타를 생성할 수 있습니다.",
      },
    },
  },
  args: {
    ...Primary.args,
  },
};

export const AvatarStatusDisplays: Story = {
  render: (args) => (
    <>
      {AVATAR_STATUS.map((status) => (
        <Avatar key={status} {...args} status={status} />
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar의 `status` props를 변경하면 status에 맞는 상태를 표시하는 아이콘을 생성할 수 있습니다.",
      },
    },
  },
  args: {
    ...Primary.args,
  },
};

export const AvatarWithInitial: Story = {
  render: (_) => <Avatar size="md" initials="테스트" status="online" />,
  parameters: {
    docs: {
      description: {
        story:
          "Avatar에 `initials` props를 지정하면 src에 지정된 이미지 대신 이니셜을 노출할 수 있습니다.",
      },
    },
  },
};
