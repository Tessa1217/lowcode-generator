import { vars } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const card = recipe({
  base: style({
    borderRadius: vars.sizing["2"],
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
  }),
  variants: {
    variant: {
      default: style({
        backgroundColor: vars.color.background.surface.default,
        border: `${vars.sizing["0.5"]} solid ${vars.color.border.base.subtle}`,
      }),
      outlined: style({
        backgroundColor: "transparent",
        border: `${vars.sizing["0.5"]} solid ${vars.color.border.base.default}`,
      }),
      elevated: style({
        backgroundColor: vars.color.background.surface.default,
        boxShadow: vars.elevation.shadow.raised,
      }),
    },
    padding: {
      none: style({
        padding: 0,
      }),
      sm: style({
        padding: vars.sizing["3"],
      }),
      md: style({
        padding: vars.sizing["4"],
      }),
      lg: style({
        padding: vars.sizing["6"],
      }),
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export type CardVariants = RecipeVariants<typeof card>;

export const CARD_VARIANTS = ["default", "outlined", "elevated"] as const;

export const CARD_PADDINGS = ["none", "sm", "md", "lg"] as const;
