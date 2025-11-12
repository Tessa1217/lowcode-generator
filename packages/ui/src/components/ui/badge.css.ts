import { COLOR_VARIANTS, vars } from "@packages/vanilla-extract-config";
import { typographyRecipe } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const badge = recipe({
  base: style({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.sizing["2"],
    fontWeight: 500,
    whiteSpace: "nowrap",
  }),
  variants: {
    color: {
      default: style({
        background: vars.color.background.surface.default,
        color: vars.color.text.primary.default,
      }),
      brand: style({
        background: vars.color.background.brand.default,
        color: vars.color.text.base.inverse,
      }),
      primary: style({
        background: vars.color.background.primary.default,
        color: vars.color.text.base.inverse,
      }),
      secondary: style({
        background: vars.color.background.secondary.default,
        color: vars.color.text.base.inverse,
      }),
      tertiary: style({
        background: vars.color.background.tertiary.default,
        color: vars.color.text.base.inverse,
      }),
      success: style({
        background: vars.color.background.success.default,
        color: vars.color.text.base.inverse,
      }),
      warning: style({
        background: vars.color.background.warning.default,
        color: vars.color.text.base.inverse,
      }),
      danger: style({
        background: vars.color.background.danger.default,
        color: vars.color.text.base.inverse,
      }),
      info: style({
        background: vars.color.background.info.default,
        color: vars.color.text.base.inverse,
      }),
    },
    size: {
      sm: [
        typographyRecipe({ role: "textSmRegular" }),
        style({
          padding: `${vars.sizing["0.5"]} ${vars.sizing["1"]}`,
        }),
      ],
      md: [
        typographyRecipe({ role: "textMdRegular" }),
        style({
          padding: `${vars.sizing["1"]} ${vars.sizing["2"]}`,
        }),
      ],
      lg: [
        typographyRecipe({ role: "textLgRegular" }),
        style({
          padding: `${vars.sizing["1.5"]} ${vars.sizing["3"]}`,
        }),
      ],
    },
    shape: {
      default: {},
      pill: style({ borderRadius: vars.sizing["10"] }),
      full: style({ borderRadius: vars.sizing.full }),
      square: style({ borderRadius: vars.sizing["0"] }),
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
    shape: "pill",
  },
});

export type BadgeVariants = RecipeVariants<typeof badge>;

export const BADGE_COLOR_VARIANTS = ["default", ...COLOR_VARIANTS] as const;

export const BADGE_SHAPES = ["default", "pill", "square", "full"] as const;
