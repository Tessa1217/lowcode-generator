import {
  SIZE_VARIANTS,
  THEME_COLOR_VARIANTS,
} from "@packages/vanilla-extract-config";
import { type ComponentMetaDefinition } from "../types";

export const PaginationMeta: ComponentMetaDefinition = {
  component: "Pagination",
  category: "Display",
  description: "페이지네이션",
  hasChildren: false,
  props: {
    count: {
      control: "number",
      default: "3",
      description: "페이지 수",
    },
    page: {
      control: "number",
      default: "1",
      description: "현재 페이지 번호",
    },
    defaultPage: {
      control: "number",
      default: "1",
      description: "기본 페이지 번호",
    },
    size: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "sm",
      description: "페이지네이션 사이즈",
    },
    variant: {
      control: "radio",
      options: ["text", "outlined"],
      default: "outlined",
      description: "페이지네이션 변형",
    },
    shape: {
      control: "radio",
      options: ["rounded", "circular"],
      default: "circular",
      description: "페이지네이션 형태",
    },
    color: {
      control: "select",
      options: [...THEME_COLOR_VARIANTS],
      default: "primary",
      description: "페이지네이션 색상",
    },
    siblingCount: {
      control: "number",
      default: 1,
      description: "형재 페이지 카운트",
    },
    boundaryCount: {
      control: "number",
      default: 1,
      description: "경계 카운트",
    },
    hidePrevButton: {
      control: "boolean",
      default: false,
      description: "이전 버튼 노출 여부",
    },
    hideNextButton: {
      control: "boolean",
      default: false,
      description: "다음 버튼 노출 여부",
    },
    showFirstButton: {
      control: "boolean",
      default: true,
      description: "First 버튼 노출 여부",
    },
    showLastButton: {
      control: "boolean",
      default: true,
      description: "Last 버튼 노출 여부",
    },
    disabled: {
      control: "boolean",
      default: false,
      description: "비활성화 여부",
    },
  },
};
