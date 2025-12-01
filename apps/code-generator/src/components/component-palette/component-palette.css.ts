import { globalStyle, style } from "@vanilla-extract/css";
import { typographyRecipe, vars } from "@packages/vanilla-extract-config";
import { recipe } from "@vanilla-extract/recipes";

export const sidebar = style({
  minWidth: "200px",
  maxWidth: "300px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRight: `1px solid ${vars.color.border.base.subtle}`,
});

export const sidebarHeader = style({
  padding: vars.sizing["4"],
  borderBottom: `1px solid ${vars.color.border.base.subtle}`,
  flexShrink: 0,
  color: vars.color.text.tertiary.default,
});

export const palette = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: vars.color.white["100"],
  overflow: "hidden",
  minHeight: "0",
});

export const paletteContent = style({
  flex: "1",
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  "::-webkit-scrollbar": {
    width: vars.sizing["1"],
  },
  "::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "::-webkit-scrollbar-thumb": {
    borderRadius: vars.sizing["1"],
    background: vars.color.background.base.default,
  },
});

export const paletteTabs = style({
  display: "flex",
  borderBottom: `1px solid ${vars.color.border.base.subtle}`,
  background: vars.color.white["100"],
  position: "sticky",
  top: "0",
  zIndex: 10,
});

export const paletteTab = recipe({
  base: [
    {
      flex: "1",
      padding: `${vars.sizing["2.5"]} ${vars.sizing["4"]}`,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: vars.sizing["2"],
      transition: "all 0.2s",
      borderBottom: "2px solid transparent",
      position: "relative",
      boxSizing: "border-box",
      color: vars.color.text.subtle.default,
      selectors: {
        "&:hover": {
          color: vars.color.text.base.default,
        },
      },
    },
    typographyRecipe({ role: "textSmSemibold" }),
  ],
  variants: {
    active: {
      true: {
        color: vars.color.text.tertiary.default,
        borderBottom: `2px solid ${vars.color.border.tertiary}`,
        selectors: {
          "&:hover": {
            color: vars.color.text.tertiary.bold,
          },
        },
      },
    },
  },
});

globalStyle(`${paletteTab()} span:not(.tab-icon)`, {
  "@media": {
    "(max-width: 1024px)": {
      display: "none",
    },
  },
});

export const categoryWrapper = style({
  selectors: {
    "&:last-child": {
      marginBottom: vars.sizing["0"],
    },
  },
});

export const categoryTitle = recipe({
  base: [
    {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: vars.color.text.subtle.default,
      textTransform: "uppercase",
      margin: vars.sizing["0"],
      padding: `${vars.sizing["2"]} ${vars.sizing["2.5"]}`,
      cursor: "pointer",
      userSelect: "none",
      height: vars.sizing["6"],
      transition: "color 0.2s ease",
      selectors: {
        "&::after": {
          content: "▾",
          fontSize: "15px",
          color: vars.color.text.base.default,
          transition: "transform 0.25s ease, color 0.2s ease",
        },
      },
    },
    typographyRecipe({ role: "textMdSemibold" }),
  ],
  variants: {
    isOpen: {
      false: {},
      true: {
        color: vars.color.text.tertiary.default,
        selectors: {
          "&::after": {
            transform: "rotate(180deg)",
            color: vars.color.text.tertiary.default,
          },
        },
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

export const categoryContent = recipe({
  base: {
    overflow: "hidden",
    transition: "max-height 0.3s ease, opacity 0.25s ease",
    maxHeight: "0",
    opacity: "0",
    willChange: "max-height, opacity",
  },
  variants: {
    isOpen: {
      true: {
        maxHeight: "800px",
        padding: vars.sizing["4"],
        opacity: "1",
      },
    },
  },
});

export const componentGrid = recipe({
  base: {
    display: "grid",
    gap: vars.sizing["3"],
    "@media": {
      "(max-width:1024px)": {
        gridTemplateColumns: "1fr",
      },
    },
  },
  variants: {
    mode: {
      component: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      template: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
    },
  },
});

export const componentCard = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    background: vars.color.background.surface.subtle,
    border: `1px solid ${vars.color.border.base.subtle}`,
    borderRadius: vars.sizing["2"],
    overflow: "hidden",
    position: "relative",
    cursor: "grab",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    userSelect: "none",
    selectors: {
      "&:hover": {
        borderColor: vars.color.border.tertiary,
        boxShadow: vars.shadow.elevation2,
        transform: "translateY(-2px)",
      },
      "&:active": {
        cursor: "grabbing",
        transform: "translateY(0)",
        boxShadow: vars.shadow.elevation3,
      },
    },
  },
  variants: {
    isDragging: {
      true: { opacity: "0.5" },
      false: {},
    },
    isSelected: {
      true: {},
      false: {},
    },
  },
});

export const thumbnail = recipe({
  base: {
    width: "100%",
    height: "100px",
    background: vars.color.background.surface.subtle,
    borderBottom: vars.color.border.base.subtle,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    "@media": {
      "(max-width:1024px)": {
        height: "120px",
      },
    },
  },
  variants: {
    loading: {
      true: { fontSize: "11px", color: vars.color.text.base.default },
    },
  },
});

export const miniPreview = style({
  transform: "scale(0.5)",
  transformOrigin: "center center",
  width: "166.67%",
  height: "166.67%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  userSelect: "none",
});

export const componentCardName = style([
  typographyRecipe({ role: "textSmSemibold" }),
  {
    padding: `${vars.sizing["2.5"]} ${vars.sizing["3"]}`,
    color: vars.color.text.base.default,
    textAlign: "center",
    background: vars.color.white["100"],
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
]);

export const templateCard = style([
  componentCard(),
  {
    padding: `${vars.sizing["2"]} ${vars.sizing["1.5"]}`,
    background: vars.color.white["100"],
  },
]);

export const templatePreview = style({
  width: "100%",
  aspectRatio: "4 / 3",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

globalStyle(`${templatePreview} img`, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const templatePlaceholder = style([
  typographyRecipe({ role: "textLgSemibold" }),
  {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
  },
]);

export const templateInfo = style([
  typographyRecipe({ role: "textXsRegular" }),
  {
    display: "flex",
    flexDirection: "column",
    gap: vars.sizing["1.5"],
  },
]);

export const templateName = style([
  typographyRecipe({ role: "textXsSemibold" }),
  {
    color: vars.color.text.base.default,
  },
]);

export const templateDescription = style([
  typographyRecipe({ role: "textXsRegular" }),
  {
    color: vars.color.text.subtle.default,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
]);
