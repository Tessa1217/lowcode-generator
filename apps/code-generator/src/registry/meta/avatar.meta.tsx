import { SIZE_VARIANTS } from "@packages/vanilla-extract-config";
import { AVATAR_STATUS } from "@packages/ui";
import { type ComponentMetaDefinition } from "../types";

export const AvatarMeta: ComponentMetaDefinition = {
  component: "Avatar",
  category: "UI",
  description: "프로필 아바타",
  hasChildren: false,
  renderPreview: (Component, props) => <Component {...props} />,
  props: {
    src: {
      control: "text",
      default: "https://placehold.co/400",
      description: "프로필 이미지 URL",
    },
    alt: {
      control: "text",
      default: "User Avatar",
      description: "대체 텍스트",
    },
    size: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "아바타 크기",
    },
    initials: {
      control: "text",
      default: "Avatar",
      description: "이미지 없을 때 표시할 이니셜",
    },
    status: {
      control: "select",
      options: [...AVATAR_STATUS],
      default: "online",
      description: "상태 표시",
    },
  },
};
