import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";

globalStyle("body", {
  margin: "0 auto",
});

export const appLayout = style({
  display: "flex",
  height: "100svh",
});

export const main = style({
  boxSizing: "border-box",
  width: "100%",
  backgroundColor: vars.color.background.base.subtle,
  display: "flex",
  flexDirection: "column",
  gap: vars.sizing["2.5"],
  height: "100%",
  padding: vars.sizing["8"],
});

export const mainSection = style({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  borderRadius: vars.sizing["2.5"],
  backgroundColor: vars.color.background.surface.default,
});

export const dragOverlayComponent = style({
  background: vars.color.background.surface.default,
  padding: vars.sizing["4"],
  borderRadius: vars.sizing["2"],
  boxShadow: vars.shadow.elevation3,
  cursor: "grabbing",
});
