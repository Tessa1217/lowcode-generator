import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "./theme.css";

export const typographyRecipe = recipe({
  variants: {
    role: {
      headingXxl: { ...vars.typography.heading.xxl },
      headingXl: { ...vars.typography.heading.xl },
      headingLg: { ...vars.typography.heading.lg },
      headingMd: { ...vars.typography.heading.md },
      headingSm: { ...vars.typography.heading.sm },
      headingXs: { ...vars.typography.heading.xs },
      textXsRegular: { ...vars.typography.text.sm.regular },
      textXsSemibold: { ...vars.typography.text.sm.semibold },
      textSmRegular: { ...vars.typography.text.sm.regular },
      textSmSemibold: { ...vars.typography.text.sm.semibold },
      textMdRegular: { ...vars.typography.text.md.regular },
      textMdSemibold: { ...vars.typography.text.md.semibold },
      textLgRegular: { ...vars.typography.text.lg.regular },
      textLgSemibold: { ...vars.typography.text.lg.semibold },
      displaySm: { ...vars.typography.display.sm },
      displayMd: { ...vars.typography.display.md },
      displayLg: { ...vars.typography.display.lg },
      captionSm: { ...vars.typography.caption.sm },
      captionMd: { ...vars.typography.caption.md },
      overline: { ...vars.typography.overline },
      codeInline: { ...vars.typography.code.inline },
      codeBlock: { ...vars.typography.code.block },
    },
  },
  defaultVariants: {
    role: "textMdRegular",
  },
});

export type TypographyRecipeVariants = RecipeVariants<typeof typographyRecipe>;

export const TYPOGRAPHY_ROLES = [
  "headingXxl",
  "headingXl",
  "headingLg",
  "headingMd",
  "headingSm",
  "headingXs",
  "textXsRegular",
  "textXsSemibold",
  "textSmRegular",
  "textSmSemibold",
  "textMdRegular",
  "textMdSemibold",
  "textLgRegular",
  "textLgSemibold",
  "displaySm",
  "displayMd",
  "displayLg",
  "captionSm",
  "captionMd",
  "overline",
  "codeInline",
  "codeBlock",
] as const;

export type TypographyRole = (typeof TYPOGRAPHY_ROLES)[number];
