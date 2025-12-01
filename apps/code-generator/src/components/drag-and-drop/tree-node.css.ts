import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";
import { recipe } from "@vanilla-extract/recipes";

export const treeNodeWrapper = style({
  position: "relative",
  transition: "box-shadow 0.2s ease",
  selectors: {
    "&:hover": {
      boxShadow: vars.shadow.elevation2,
      borderRadius: vars.sizing["1"],
    },
  },
});

export const treeNodeInline = style({
  display: "inline-block",
});

const fadeInUp = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(-8px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const treeNodeActionsPortal = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.sizing["0.5"],
  animation: `${fadeInUp} 0.15s ease-out`,
});

export const treeNodeButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: vars.sizing["6"],
  height: vars.sizing["6"],
  padding: vars.sizing["0"],
  backgroundColor: vars.color.background.base.inverse,
  border: `1px solid ${vars.color.border.base.subtle}`,
  borderRadius: vars.sizing["full"],
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow: vars.shadow.elevation3,
  selectors: {
    "&:hover": {
      transform: "scale(1.1)",
      background: vars.color.background.tertiary.default,
      color: vars.color.white["100"],
      boxShadow: vars.shadow.elevation4,
    },
    "&:active": {
      transform: "scale(0.95)",
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },
});

export const treeNodeSelectButton = recipe({
  variants: {
    selected: {
      true: {
        background: vars.color.background.tertiary.bold,
        color: vars.color.text.tertiary.inverse,
      },
    },
  },
});

globalStyle(`${treeNodeSelectButton} svg`, {
  width: vars.sizing["4"],
  height: vars.sizing["4"],
});

export const treeNodeDragHandle = recipe({
  base: {
    cursor: "grab",
    selectors: {
      "&:focus-visible": {
        outline: `2px solid ${vars.color.text.tertiary.default}`,
        outlineOffset: vars.sizing["0.5"],
      },
      "&:active": {
        cursor: "grabbing",
      },
    },
  },
  variants: {
    dragging: {
      true: {
        cursor: "grabbing",
        background: vars.color.background.base.inverse,
        borderColor: vars.color.border.tertiary,
      },
    },
  },
});

globalStyle(`${treeNodeDragHandle()} svg`, {
  width: vars.sizing["4"],
  height: vars.sizing["4"],
});

export const treeNodeDeleteButton = style({
  selectors: {
    "&:hover": {
      background: vars.color.background.danger.bold,
      border: vars.color.border.danger,
    },
  },
});

globalStyle(`${treeNodeDeleteButton} svg`, {
  width: vars.sizing["4"],
  height: vars.sizing["4"],
  color: vars.color.text.danger.default,
});

globalStyle(`${treeNodeDeleteButton}:hover svg`, {
  color: vars.color.white["100"],
});

export const tableButton = recipe({
  base: {
    position: "absolute",
    zIndex: "10",
    display: "flex",
    width: vars.sizing["6"],
    height: vars.sizing["6"],
    padding: vars.sizing["0"],
    backgroundColor: vars.color.background.base.inverse,
    border: `1px solid ${vars.color.border.base.subtle}`,
    borderRadius: vars.sizing["full"],
    cursor: "pointer",
    transition: "all 0.2s ease",
    opacity: "0",
    visibility: "hidden",
    pointerEvents: "none",
    boxShadow: vars.shadow.elevation3,
    selectors: {
      "&:hover": {
        background: vars.color.background.base.default,
        borderColor: vars.color.border.tertiary,
        color: vars.color.text.tertiary.inverse,
        transform: "scale(1.1)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
    },
  },
  variants: {
    hovered: {
      true: { opacity: "1", visibility: "visible", pointerEvents: "auto" },
    },
  },
});

globalStyle(`${tableButton()} svg`, {
  width: vars.sizing["4"],
  height: vars.sizing["4"],
  color: vars.color.text.danger.default,
});

globalStyle(`${tableButton()}:hover svg`, {
  color: vars.color.text.tertiary.default,
});

export const colAddButton = recipe({
  base: {
    top: "-15px",
    right: "-10px",
    selectors: {
      "&:hover": {
        transform: "scale(1.1)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
    },
  },
  variants: {
    hovered: {
      true: { transform: "translateY(0)" },
    },
  },
});

export const rowAddButton = recipe({
  base: {
    bottom: "-14px",
    left: "50%",
    transform: "translateX(-50%)",
    selectors: {
      "&:hover": {
        transform: "translateX(-50%) scale(1.1)",
      },
      "&:active": {
        transform: "translateX(-50%) scale(0.95)",
      },
    },
  },
  variants: {
    hovered: {
      true: { transform: "translateX(-50%) translateY(0)" },
    },
  },
});

export const tableDeleteButton = recipe({
  base: {
    fontSize: "10px",
    width: vars.sizing["4"],
    height: vars.sizing["4"],
    color: vars.color.text.danger.default,
    selectors: {
      "&:hover": {
        background: vars.color.background.danger.default,
        color: vars.color.text.base.inverse,
        border: vars.color.border.danger,
        transform: "scale(1.1)",
        boxShadow: vars.shadow.elevation3,
      },
      "&:active": {
        transform: "scale(0.9)",
      },
    },
  },
  variants: {
    direction: {
      row: {},
      col: {
        bottom: "-5px",
        right: "0px",
      },
    },
  },
});

globalStyle(`${tableDeleteButton()}:hover svg`, {
  color: vars.color.text.base.inverse,
});

export const emptyDropZone = style({
  minHeight: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.text.subtle.default,
  fontSize: "14px",
  border: `2px dashed ${vars.color.border.base.subtle}`,
  borderRadius: vars.sizing["1"],
  background: vars.color.background.base.subtle,
});

export const droppableArea = recipe({
  base: {
    position: "relative",
    minHeight: "40px",
    transition: "all 0.2s",
  },
  variants: {
    dragging: {
      true: {
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        outline: "2px solid #3b82f6",
        outlineOffset: "-2px",
      },
      false: {},
    },
  },
  defaultVariants: {
    dragging: false,
  },
});

globalStyle(`${droppableArea({})} ${droppableArea({ dragging: true })}`, {
  backgroundColor: "rgba(59, 130, 246, 0.2)",
  outlineColor: "#2563eb",
});
