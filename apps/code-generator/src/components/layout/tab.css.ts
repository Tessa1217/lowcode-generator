import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { typographyRecipe } from "@packages/vanilla-extract-config";
import { vars } from "@packages/vanilla-extract-config";

export const mainTabs = style({
  position: "sticky",
  top: "0",
  zIndex: "10",
  background: "transparent",
  paddingTop: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const tabWrapper = style({
  display: "flex",
  gap: vars.sizing["2.5"],
  background: "rgba(255, 255, 255, 0.8)",
  padding: `${vars.sizing["1.5"]} ${vars.sizing["2"]}`,
  borderRadius: vars.sizing["64"],
  boxShadow: vars.shadow.elevation2,
  backdropFilter: "blur(6px)",
});

export const tab = recipe({
  base: [
    {
      border: "none",
      background: vars.color.background.base.subtle,
      color: vars.color.text.base.default,
      padding: "0.55rem 1.8rem",
      borderRadius: vars.sizing["64"],
      cursor: "pointer",
      transition: "all 0.25s ease",
    },
    typographyRecipe({ role: "textSmSemibold" }),
  ],
  variants: {
    isActive: {
      true: {
        background: vars.color.background.tertiary.default,
        color: vars.color.text.base.inverse,
        boxShadow: vars.shadow.elevation3,
      },
      false: {
        ":hover": {
          background: vars.color.background.base.default,
        },
      },
    },
  },
});
