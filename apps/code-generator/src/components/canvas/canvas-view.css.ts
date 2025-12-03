import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "@packages/vanilla-extract-config";

export const canvasView = style({
  display: "flex",
  position: "relative",
  height: "100%",
  overflow: "hidden",
  "@media": {
    "(max-width: 1024px)": {
      flexDirection: "column",
    },
  },
});

export const componentCanvas = recipe({
  base: {
    flex: "1 1 70%",
    height: "100%",
    padding: vars.sizing["5"],
    border: `2px dashed ${vars.color.background.tertiary.default}`,
    borderRadius: vars.sizing["2.5"],
    overflow: "hidden",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
    ":hover": {
      borderColor: vars.color.background.tertiary.bold,
    },
    "@media": {
      "(max-width: 1024px)": {
        flex: "1 1 auto",
        width: "100%",
      },
    },
  },
  variants: {
    panMode: {
      true: {},
      false: {},
    },
    dragging: {
      true: {},
      false: {},
    },
    isOver: {
      true: {
        borderColor: vars.color.border.tertiary,
        backgroundColor: vars.color.background.tertiary.subtle,
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { panMode: true, dragging: true },
      style: {
        cursor: "grabbing",
      },
    },
    {
      variants: { panMode: true, dragging: false },
      style: {
        cursor: "grab",
      },
    },
  ],
  defaultVariants: {
    isOver: false,
  },
});

export type ComponentCanvasVariants = RecipeVariants<typeof componentCanvas>;

export const canvasInner = recipe({
  base: {
    transformOrigin: "top left",
    width: "100%",
    height: "100%",
    cursor: "default",
    willChange: "transform",
    transition: "transform 0.1s ease-out",
  },
  variants: {
    panMode: {
      true: {},
      false: {},
    },
    dragging: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { panMode: true, dragging: true },
      style: {
        cursor: "grabbing",
      },
    },
    {
      variants: { panMode: true, dragging: false },
      style: {
        cursor: "grab",
      },
    },
  ],
});

export const emptyCanvas = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.text.subtle.default,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.regular,
});

export const canvasToolbar = style({
  position: "fixed",
  bottom: vars.sizing["4"],
  right: vars.sizing["4"],
  display: "flex",
  flexDirection: "row",
  gap: vars.sizing["2"],
  zIndex: 100,
});

// History Controls
export const historyControls = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizing["1.5"],
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(8px)",
  border: `1px solid ${vars.color.border.base.default}`,
  padding: `${vars.sizing["1.5"]} ${vars.sizing["2.5"]}`,
  borderRadius: vars.sizing["2"],
  boxShadow: vars.shadow.elevation2,
});

export const historyBtn = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: vars.sizing["8"],
    height: vars.sizing["8"],
    padding: 0,
    border: "none",
    background: "transparent",
    borderRadius: vars.sizing["1"],
    cursor: "pointer",
    color: vars.color.text.base.default,
    transition: "all 0.15s ease",
  },
  variants: {
    disabled: {
      true: {
        color: vars.color.text.disabled,
        cursor: "not-allowed",
        opacity: 0.5,
      },
      false: {
        ":hover": {
          background: vars.color.background.surface.subtle,
          color: vars.color.text.base.default,
        },
        ":active": {
          transform: "scale(0.95)",
        },
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

// Zoom Controls
export const zoomControl = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizing["1.5"],
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(8px)",
  border: `1px solid ${vars.color.border.base.default}`,
  padding: `${vars.sizing["1.5"]} ${vars.sizing["2.5"]}`,
  borderRadius: vars.sizing["2"],
  boxShadow: vars.shadow.elevation2,
});

export const zoomButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: vars.sizing["8"],
  height: vars.sizing["8"],
  padding: vars.sizing["0"],
  background: "transparent",
  border: "none",
  borderRadius: vars.sizing["1"],
  cursor: "pointer",
  color: vars.color.text.base.default,
  fontSize: vars.font.size.md,
  transition: "all 0.15s ease",
  ":hover": {
    background: vars.color.background.surface.subtle,
    color: vars.color.text.base.default,
  },
  ":active": {
    transform: "scale(0.95)",
  },
});

globalStyle(`${historyBtn} svg`, {
  flexShrink: 0,
});

export const zoomLevel = style({
  fontWeight: vars.font.weight.semibold,
  fontSize: vars.font.size.sm,
  minWidth: "48px",
  textAlign: "center",
  color: vars.color.text.base.default,
  userSelect: "none",
});

export const panButton = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: vars.sizing["8"],
    height: vars.sizing["8"],
    padding: vars.sizing["0"],
    background: "transparent",
    border: "none",
    borderRadius: vars.sizing["1"],
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      background: vars.color.background.surface.subtle,
      color: vars.color.text.base.default,
    },
  },
  variants: {
    active: {
      true: {
        background: vars.color.background.tertiary.default,
        borderColor: vars.color.border.tertiary,
        color: vars.color.white["100"],
        ":hover": {
          background: vars.color.background.tertiary.subtle,
          borderColor: vars.color.border.tertiary,
        },
      },
    },
  },
});

export type HistoryBtnVariants = RecipeVariants<typeof historyBtn>;

export const treeNode = style({
  margin: `${vars.sizing["2"]} 0`,
  background: vars.color.background.surface.default,
  border: `1px solid ${vars.color.border.base.subtle}`,
  borderRadius: vars.sizing["1"],
});

export const treeNodeHeader = style({
  padding: vars.sizing["3"],
  cursor: "move",
  background: vars.color.background.surface.subtle,
  borderBottom: `1px solid ${vars.color.border.base.subtle}`,
  ":hover": {
    background: vars.color.neutral["100"],
  },
});

export const treeNodeChildren = style({
  padding: vars.sizing["3"],
  minHeight: "60px",
});

export const emptyDropZone = style({
  boxSizing: "border-box",
  height: "100%",
  width: "100%",
  padding: vars.sizing["5"],
  textAlign: "center",
  color: vars.color.text.subtle.default,
  border: `2px dashed ${vars.color.border.base.subtle}`,
  borderRadius: vars.sizing["1"],
  background: vars.color.background.surface.subtle,
});
