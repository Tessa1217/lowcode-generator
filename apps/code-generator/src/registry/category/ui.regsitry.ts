// Component
import { Button, Divider, Card, Badge, Avatar } from "@packages/ui";
// 메타 파일
import { ButtonMeta } from "../meta/button.meta";
import { DividerMeta } from "../meta/divider.meta";
import { CardMeta } from "../meta/card.meta";
import { BadgeMeta } from "../meta/badge.meta";
import { AvatarMeta } from "../meta/avatar.meta";

/**
 * UI 컴포넌트 Registry
 */
export const UiComponentRegistry = {
  Button: {
    component: Button,
    meta: ButtonMeta,
  },
  Divider: {
    component: Divider,
    meta: DividerMeta,
  },
  Card: {
    component: Card,
    meta: CardMeta,
  },
  Badge: {
    component: Badge,
    meta: BadgeMeta,
  },
  Avatar: {
    component: Avatar,
    meta: AvatarMeta,
  },
} as const;
