import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { typographyRecipe } from "@packages/vanilla-extract-config";
import { vars } from "@packages/vanilla-extract-config";

export const treeViewWrapper = style({
  display: "flex",
  position: "relative",
  height: "100vh",
  background: vars.color.background.surface.default,
  "@media": {
    "(max-width: 1024px)": {
      flexDirection: "column",
    },
  },
});

export const componentTreeFlow = style({
  flex: "1 1 70%",
  position: "relative",
  "@media": {
    "(max-width: 1024px)": {
      flex: "1 1 auto",
      width: "100%",
    },
  },
});

export const componentInspector = recipe({
  base: {
    display: "flex",
    flex: "0 0 320px",
    position: "relative",
    "@media": {
      "(max-width: 1024px)": {
        flex: "1 1 auto",
        width: "100%",
        order: 2,
      },
    },
  },
  variants: {
    hidden: {
      true: { display: "none" },
    },
  },
});

export const componentInspectorCloseButton = style([
  typographyRecipe({ role: "textXsRegular" }),
  {
    position: "absolute",
    top: "12px",
    right: "12px",
    border: `1px solid ${vars.color.border.base.subtle}`,
    background: vars.color.white["100"],
    padding: `${vars.sizing["1"]} ${vars.sizing["2.5"]}`,
    borderRadius: vars.sizing["2"],
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: vars.shadow.elevation2,
    zIndex: 100,
    selectors: {
      "&:hover": {
        background: vars.color.background.base.subtle,
        border: vars.color.border.base.subtle,
      },
      "&:active": {
        background: vars.color.background.base.subtle,
        transform: "scale(0.98)",
      },
    },
  },
]);

export const emptyPropsContainer = style({
  width: "100%",
  background: vars.color.white["100"],
  boxShadow: vars.shadow.elevation2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.text.base.default,
});

export const componentPropsContainer = style([
  typographyRecipe({ role: "textXsRegular" }),
  {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    background: vars.color.white["100"],
    boxSizing: "border-box",
    boxShadow: vars.shadow.elevation2,
    padding: vars.sizing["4"],
    overflowY: "auto",
  },
]);

export const componentPropsTitle = style([
  typographyRecipe({ role: "textMdSemibold" }),
  {
    color: vars.color.text.tertiary.bold,
    marginBottom: vars.sizing["4"],
  },
]);

export const componentPropsCategoryContainer = style({
  marginBottom: vars.sizing["4"],
});

export const componentPropsCategoryTitle = style([
  typographyRecipe({ role: "textXsSemibold" }),
  {
    textTransform: "uppercase",
    color: vars.color.text.tertiary.default,
    marginBottom: vars.sizing["1"],
  },
]);

export const componentPropsGroup = style({
  display: "flex",
  boxSizing: "border-box",
  padding: `0 ${vars.sizing["1"]}`,
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: vars.sizing["1"],
  gap: vars.sizing["2"],
});

export const componentPropsGroupTitle = style([
  typographyRecipe({ role: "textXsSemibold" }),
  {
    color: vars.color.text.subtle.default,
    marginBottom: vars.sizing["1"],
  },
]);

export const componentPropsGroupNoValue = style({
  color: vars.color.text.base.default,
  flex: "1",
  margin: `${vars.sizing["4"]} 0`,
});

export const componentPropsTable = style({
  borderCollapse: "collapse",
  width: "100%",
  marginTop: vars.sizing["1"],
});

globalStyle(`${componentPropsTable} th, ${componentPropsTable} td`, {
  border: `1pxc solid ${vars.color.border.base.subtle}`,
  padding: `${vars.sizing["1"]} ${vars.sizing["1.5"]}`,
  textAlign: "left",
});

globalStyle(`${componentPropsTable} th`, {
  background: vars.color.background.base.subtle,
});

export const componentPropsNestedObject = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizing["0.5"],
});

export const nestedObjectPair = style({});

globalStyle(`${nestedObjectPair} strong`, {
  color: vars.color.text.subtle.default,
  marginRight: vars.sizing["1"],
});

export const treeViewComponent = style({
  border: `1px solid ${vars.color.border.base.default}`,
  borderRadius: vars.sizing["2"],
  padding: `${vars.sizing["1.5"]} ${vars.sizing["2.5"]}`,
  background: vars.color.background.surface.default,
  boxShadow: vars.shadow.elevation2,
  textAlign: "center",
});
