import { vars } from "@packages/vanilla-extract-config";
import { typographyRecipe } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const formLabel = recipe({
  base: [
    typographyRecipe({ role: "textMdRegular" }),
    {
      color: vars.color.text.base.default,
      display: "flex",
      alignItems: "center",
      gap: vars.sizing["1"],
      cursor: "pointer",
    },
  ],
  variants: {
    labelSize: {
      sm: [typographyRecipe({ role: "textSmRegular" })],
      md: [typographyRecipe({ role: "textMdRegular" })],
      lg: [typographyRecipe({ role: "textLgRegular" })],
    },
  },
  defaultVariants: {
    labelSize: "md",
  },
});

export const requiredIndicator = style({
  color: vars.color.text.danger.bold,
});

export type FormLabelVariants = RecipeVariants<typeof formLabel>;
