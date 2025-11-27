import {
  style,
  globalStyle,
  keyframes,
  createTheme,
  createThemeContract,
} from "@vanilla-extract/css";
import { typographyRecipe, vars } from "@packages/vanilla-extract-config";
import { recipe } from "@vanilla-extract/recipes";

// ====== Theme Contract(에디터용 - 나중에 theme 확장 시 고려) ======
export const editorThemeVars = createThemeContract({
  background: {
    container: null,
    toolbar: null,
    popup: null,
  },
  text: {
    default: null,
    header: null,
  },
  border: {
    default: null,
    popup: null,
  },
  input: {
    background: null,
    border: null,
    focusBorder: null,
    focusShadow: null,
  },
});

// ====== Light Theme ======
export const lightTheme = createTheme(editorThemeVars, {
  background: {
    container: vars.color.background.base.subtle,
    toolbar: vars.color.background.base.subtle,
    popup: vars.color.white["100"],
  },
  text: {
    default: "#1e1e1e",
    header: vars.color.text.base.default,
  },
  border: {
    default: vars.color.border.base.subtle,
    popup: vars.color.border.base.subtle,
  },
  input: {
    background: vars.color.neutral["50"],
    border: vars.color.border.base.default,
    focusBorder: vars.color.neutral["600"],
    focusShadow: vars.color.neutral["100"],
  },
});

// ====== Dark Theme ======
export const darkTheme = createTheme(editorThemeVars, {
  background: {
    container: vars.color.background.base.bold,
    toolbar: vars.color.background.base.bold,
    popup: vars.color.neutral["900"],
  },
  text: {
    default: "#cccccc",
    header: vars.color.neutral["300"],
  },
  border: {
    default: vars.color.border.base.default,
    popup: vars.color.neutral["700"],
  },
  input: {
    background: vars.color.neutral["700"],
    border: vars.color.neutral["700"],
    focusBorder: vars.color.neutral["700"],
    focusShadow: vars.color.neutral["200"],
  },
});

// ====== Keyframes ======
const fadeInDown = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(-8px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

const tooltipFadeIn = keyframes({
  from: {
    opacity: 0,
    transform: "translateX(-50%) translateY(-4px)",
  },
  to: {
    opacity: 1,
    transform: "translateX(-50%) translateY(0)",
  },
});

export const codeEditorView = style({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  height: "100%",
  padding: "20px",
  boxSizing: "border-box",
  overflow: "hidden",
});

export const codeEditorHeader = style({
  margin: "0 0 15px 0",
  fontSize: "24px",
  fontWeight: "600",
});

export const codeEditorContainer = style({
  flex: 1,
  minHeight: 0,
  position: "relative",
});

// ====== Main Styles ======
export const codeEditorWrapper = style({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  borderRadius: vars.sizing["2"],
  border: `1px solid ${vars.color.border.base.default}`,
});

export const codeEditorToolbar = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: vars.sizing["2"],
  padding: `${vars.sizing["2"]} ${vars.sizing["3"]}`,
  background: editorThemeVars.background.toolbar,
  borderBottom: `1px solid ${editorThemeVars.border.default}`,
});

export const codeEditorFilenameWrapper = style({
  position: "relative",
});

export const toolbarButtonWrapper = style({
  position: "relative",
});

export const toolbarButton = style([
  {
    padding: `${vars.sizing["1.5"]} ${vars.sizing["3"]}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: vars.sizing["1"],
    background: vars.color.background.tertiary.default,
    color: vars.color.white["100"],
    border: "none",
    borderRadius: vars.sizing["1"],
    cursor: "pointer",
    transition: "background 0.2s",
    ":hover": {
      background: vars.color.background.tertiary.bold,
    },
    ":active": {
      transform: "scale(0.98)",
    },
  },
  typographyRecipe({ role: "textSmSemibold" }),
]);

globalStyle(`${toolbarButton} svg`, {
  width: vars.sizing["3"],
  height: vars.sizing["3"],
});

// ====== Filename Popup ======
export const codeEditorFilenamePopup = style({
  position: "absolute",
  top: `calc(100% + ${vars.sizing["2"]})`,
  left: 0,
  width: "280px",
  background: editorThemeVars.background.popup,
  border: `1px solid ${editorThemeVars.border.popup}`,
  borderRadius: vars.sizing["1.5"],
  boxShadow: vars.shadow.elevation4,
  zIndex: 100,
  padding: vars.sizing["4"],
  boxSizing: "border-box",
  animation: `${fadeInDown} 0.2s ease-out`,
});

export const filenamePopupHeader = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.semibold,
  marginBottom: vars.sizing["2.5"],
  paddingBottom: vars.sizing["2"],
  color: editorThemeVars.text.header,
  borderBottom: `1px solid ${editorThemeVars.border.popup}`,
});

// ====== Input ======
export const codeEditorInput = style([
  {
    width: "100%",
    padding: `${vars.sizing["2"]} ${vars.sizing["2.5"]}`,
    margin: `0 0 ${vars.sizing["3"]} 0`,
    background: editorThemeVars.input.background,
    border: `1px solid ${editorThemeVars.input.border}`,
    borderRadius: vars.sizing["1"],
    boxSizing: "border-box",
    color: editorThemeVars.text.default,
    outline: "none",
    transition: "all 0.2s",
    ":focus": {
      borderColor: editorThemeVars.input.focusBorder,
      boxShadow: `0 0 0 2px ${editorThemeVars.input.focusShadow}`,
    },
  },
  typographyRecipe({ role: "textXsRegular" }),
]);

export const filenameConfirmBtn = style([
  typographyRecipe({ role: "textXsSemibold" }),
  {
    width: "100%",
    padding: `${vars.sizing["2"]} ${vars.sizing["3"]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.sizing["1"],
    background: vars.color.background.success.default,
    color: vars.color.text.base.inverse,
    border: "none",
    borderRadius: vars.sizing["1"],
    cursor: "pointer",
    transition: "background 0.2s",
    ":hover": {
      background: vars.color.background.success.bold,
    },
    ":active": {
      transform: "scale(0.98)",
    },
  },
]);

// ====== Editor ======
export const codeEditor = style({
  flex: 1,
  overflow: "hidden",
  fontFamily: vars.font.family.code,
  background: editorThemeVars.background.container,
});

// ====== Tooltip ======
export const toolbarTooltip = recipe({
  base: [
    typographyRecipe({ role: "textSmRegular" }),
    {
      position: "absolute",
      bottom: `calc(100% + ${vars.sizing["2"]})`,
      left: "50%",
      transform: "translateX(-50%)",
      alignItems: "center",
      gap: vars.sizing["1"],
      padding: `${vars.sizing["1.5"]} ${vars.sizing["3"]}`,
      background: vars.color.background.success.default,
      color: vars.color.white["100"],
      borderRadius: vars.sizing["1"],
      whiteSpace: "nowrap",
      display: "flex",
      boxShadow: vars.shadow.elevation2,
      zIndex: 999,
      animation: `${tooltipFadeIn} 0.2s ease-out`,
      selectors: {
        "&::after": {
          content: '""',
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          border: "5px solid transparent",
          borderTopColor: vars.color.border.success,
        },
      },
    },
  ],
  variants: {
    show: {
      false: { visibility: "hidden" },
      true: { visibility: "visible" },
    },
  },
});

export const tooltipIcon = style({
  width: vars.sizing["3.5"],
  height: vars.sizing["3.5"],
  flexShrink: 0,
});
