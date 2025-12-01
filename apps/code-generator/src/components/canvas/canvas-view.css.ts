import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "@packages/vanilla-extract-config";

export const canvasView = style({
  display: "flex",
  position: "relative",
  height: "100%",
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
    overflow: "auto",
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
    isOver: {
      true: {
        borderColor: vars.color.teal["600"],
        backgroundColor: vars.color.teal["100"],
      },
      false: {},
    },
  },
  defaultVariants: {
    isOver: false,
  },
});

export type ComponentCanvasVariants = RecipeVariants<typeof componentCanvas>;

export const canvasInner = style({
  transformOrigin: "top left",
  willChange: "transform",
  transition: "transform 0.1s ease-out",
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
