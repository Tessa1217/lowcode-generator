import { style } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";

export const appLayout = style({
  display: "flex",
  height: "100svh",
});

export const sidebar = style({
  minWidth: "200px",
  maxWidth: "300px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRight: `1px solid ${vars.color.border.base}`,
});

export const sidebarHeader = style({
  padding: vars.sizing["4"],
  borderBottom: `1px solid ${vars.color.border}`,
  flexShrink: 0,
  color: vars.color.text.primary.default,
});

export const main = style({
  boxSizing: "border-box",
  width: "100%",
  backgroundColor: vars.color.background.base.default,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  height: "100%",
  padding: vars.sizing["8"],
});

export const mainSection = style({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  borderRadius: vars.sizing["3"],
  backgroundColor: vars.color.background.surface.default,
});

export const dragOverlayComponent = style({
  background: vars.color.background.surface.default,
  padding: vars.sizing["4"],
  borderRadius: vars.sizing["2"],
  boxShadow: vars.shadow.elevation2,
  cursor: "grabbing",
});
