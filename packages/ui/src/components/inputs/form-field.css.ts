import { vars } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const formField = recipe({
  base: style({
    display: "flex",
    flexDirection: "column",
  }),
  variants: {
    spacing: {
      sm: style({
        gap: vars.sizing["1"],
        padding: `${vars.sizing["1"]} ${vars.sizing["1"]}`,
      }),
      md: style({
        gap: vars.sizing["2"],
        padding: `${vars.sizing["2"]} ${vars.sizing["2"]}`,
      }),
      lg: style({
        gap: vars.sizing["3"],
        padding: `${vars.sizing["3"]} ${vars.sizing["3"]}`,
      }),
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

export type FormFieldVariants = RecipeVariants<typeof formField>;
