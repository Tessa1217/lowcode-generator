import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { typographyRecipe, vars } from "@packages/vanilla-extract-config";
export const propertyEditor = recipe({
  base: {
    height: "100%",
    display: "flex",
    flex: "0 0 320px",
    flexDirection: "column",
    position: "relative",
    borderLeft: `1px solid ${vars.color.border.base.subtle}`,
    "@media": {
      "(max-width: 1024px)": {
        flex: "1 1 auto",
        width: "100%",
        order: 2,
        maxHeight: "40%",
        overflowY: "hidden",
      },
    },
  },
  variants: {
    hidden: {
      true: { display: "none" },
    },
  },
});

export const propertyEditorHeader = style([
  typographyRecipe({ role: "textMdSemibold" }),
  {
    padding: vars.sizing["4"],
    borderBottom: `1px solid ${vars.color.border.base.subtle}`,
    marginBottom: vars.sizing["3"],
  },
]);

globalStyle(`${propertyEditorHeader} h3`, {
  margin: `0 0 ${vars.sizing["1"]} 0`,
});

export const propertyHeaderContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: vars.sizing["2"],
});

export const componentDescription = style([
  typographyRecipe({ role: "textSmRegular" }),
  { margin: vars.sizing["0"] },
]);

export const propertyEditorEmpty = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

export const propertyFields = style({
  flex: "1",
  overflowY: "auto",
  padding: vars.sizing["4"],
});

/**
 * Property Canvas Editor
 */
export const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const slideUp = keyframes({
  "0%": { transform: "translateY(20px)", opacity: 0 },
  "100%": { transform: "translateY(0)", opacity: 1 },
});

export const editorOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1200,
  animation: `${fadeIn} 0.2s ease-out`,
});

export const editorPanel = style({
  background: vars.color.white[100],
  borderRadius: vars.sizing["2"],
  width: "480px",
  maxWidth: "90vw",
  maxHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  animation: `${slideUp} 0.3s ease-out`,
  "@media": {
    "(max-width: 640px)": {
      width: "100%",
      maxWidth: "100vw",
      maxHeight: "90vh",
      borderRadius: "8px 8px 0 0",
      alignSelf: "flex-end",
    },
  },
});

export const editorHeader = style({
  padding: `${vars.sizing["6"]} ${vars.sizing["8"]}`,
  borderBottom: `1px solid ${vars.color.border.base.subtle}`,
  position: "relative",
});

export const headerContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: vars.sizing["2"],
});

globalStyle(`${editorHeader} h3`, {
  fontSize: "18px",
  fontWeight: 600,
  margin: 0,
  color: "#111827",
});

export const closeButton = style([
  typographyRecipe({ role: "textSmRegular" }),
  {
    background: "none",
    border: "none",
    color: vars.color.text.subtle.default,
    cursor: "pointer",
    padding: `${vars.sizing["0.5"]} ${vars.sizing["1"]}`,
    transition: "all 0.15s ease",
    ":hover": {
      backgroundColor: vars.color.white["100"],
      color: vars.color.text.base.default,
    },
  },
]);

export const propertyFieldsScroll = style({
  flex: 1,
  overflowY: "auto",
  padding: `${vars.sizing["4"]} ${vars.sizing["6"]}`,
});

globalStyle(`${propertyFieldsScroll}::-webkit-scrollbar`, {
  width: vars.sizing["2"],
});

globalStyle(`${propertyFieldsScroll}::-webkit-scrollbar-track`, {
  background: vars.color.background.surface.subtle,
});

globalStyle(`${propertyFieldsScroll}::-webkit-scrollbar-thumb`, {
  background: vars.color.background.surface.subtle,
  borderRadius: vars.sizing["1"],
});

globalStyle(`${propertyFieldsScroll}::-webkit-scrollbar-thumb:hover`, {
  background: vars.color.background.surface.elevated,
});

export const noProperties = style([
  typographyRecipe({ role: "textXsRegular" }),
  {
    textAlign: "center",
    color: vars.color.text.subtle.default,
    padding: vars.sizing["6"],
    margin: vars.sizing["0"],
  },
]);

export const editorFooter = style({
  padding: `${vars.sizing["4"]} ${vars.sizing["6"]}`,
  borderTop: `1px solid ${vars.color.border.base.subtle}`,
});

export const addComponentButton = style([
  typographyRecipe({ role: "textSmSemibold" }),
  {
    width: "100%",
    padding: `${vars.sizing["2"]} ${vars.sizing["4"]}`,
    background: vars.color.white[100],
    color: vars.color.text.tertiary.default,
    border: `1px solid ${vars.color.border.tertiary}`,
    borderRadius: vars.sizing["2.5"],
    cursor: "pointer",
    transition: "all 0.15s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: vars.sizing["1"],

    ":hover": {
      backgroundColor: vars.color.background.tertiary.subtle,
      borderColor: vars.color.border.tertiary,
    },
  },
]);

// SVG size
globalStyle(`${addComponentButton} svg`, {
  width: "15px",
  height: "15px",
});

/**
 * Property Field
 */
export const propertyField = style({
  marginBottom: "20px",
});

export const propertyFieldHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: vars.sizing["1.5"],
});

// label 스타일
globalStyle(`${propertyFieldHeader} label`, {
  fontSize: "13px",
  fontWeight: 500,
  color: vars.color.text.base.default,
});

export const required = style({
  color: vars.color.text.danger.default,
  marginLeft: vars.sizing["0.5"],
});

export const resetButton = style([
  typographyRecipe({ role: "textSmRegular" }),
  {
    padding: `${vars.sizing["0.5"]} ${vars.sizing["1.5"]}`,
    background: "transparent",
    border: `1px solid ${vars.color.border.base.default}`,
    borderRadius: vars.sizing["1"],
    cursor: "pointer",
    opacity: 0.6,
    transition: "opacity 0.2s",
    ":hover": {
      opacity: 1,
    },
  },
]);

/**
 * Property Field Control
 */
export const propertyFieldControl = style({
  width: "100%",
  position: "relative",
  boxSizing: "border-box",
});

const inputSelector = `${propertyFieldControl} input[type="text"],
${propertyFieldControl} input[type="number"],
${propertyFieldControl} select,
${propertyFieldControl} textarea`;

globalStyle(inputSelector, {
  width: "100%",
  padding: `${vars.sizing["1.5"]}  ${vars.sizing["2"]}`,
  border: `1px solid ${vars.color.border.base.default}`,
  borderRadius: vars.sizing["1"],
  boxSizing: "border-box",
  background: vars.color.background.input.default,
  transition: "border-color 0.2s",
});

globalStyle(
  `${propertyFieldControl} input:focus,
   ${propertyFieldControl} select:focus,
   ${propertyFieldControl} textarea:focus`,
  {
    outline: "none",
    borderColor: vars.color.border.base.bold,
  }
);

globalStyle(`${propertyFieldControl} input[type="number"]`, {
  appearance: "textfield",
  WebkitAppearance: "textfield",
  MozAppearance: "textfield",
});

globalStyle(
  `${propertyFieldControl} input[type="number"]::-webkit-inner-spin-button`,
  {
    WebkitAppearance: "none",
    margin: 0,
  }
);

globalStyle(
  `${propertyFieldControl} input[type="number"]::-webkit-outer-spin-button`,
  {
    WebkitAppearance: "none",
    margin: 0,
  }
);

export const checkboxWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizing["2"],
  cursor: "pointer",
});

globalStyle(`${checkboxWrapper} input[type="checkbox"]`, {
  width: vars.sizing["4"],
  height: vars.sizing["4"],
  cursor: "pointer",
});

export const checkboxLabel = style([
  typographyRecipe({ role: "textXsRegular" }),
  {
    userSelect: "none",
  },
]);

export const propertyDescription = style([
  typographyRecipe({ role: "textXsRegular" }),
  {
    display: "block",
    marginTop: vars.sizing["1"],
    color: vars.color.text.subtle.default,
    lineHeight: "1.4",
  },
]);
