import { vars } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const formField = recipe({
  base: style({
    display: "flex",
    flexDirection: "column",
    width: "100%",
  }),
  variants: {
    spacing: {
      sm: style({
        gap: vars.sizing["1"], // 4px
      }),
      md: style({
        gap: vars.sizing["2"], // 8px
      }),
      lg: style({
        gap: vars.sizing["3"], // 12px
      }),
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

export type FormFieldVariants = RecipeVariants<typeof formField>;
