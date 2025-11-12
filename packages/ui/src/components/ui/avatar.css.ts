import { vars } from "@packages/vanilla-extract-config";
import { typographyRecipe } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const avatarContainer = recipe({
  base: style({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
  }),
  variants: {
    size: {
      sm: style({ width: vars.sizing["8"], height: vars.sizing["8"] }),
      md: style({ width: vars.sizing["10"], height: vars.sizing["10"] }),
      lg: style({ width: vars.sizing["12"], height: vars.sizing["12"] }),
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const avatarImage = style({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
});

export const avatarFallback = recipe({
  base: style({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: vars.color.background.surface.subtle,
    color: vars.color.text.base.default,
  }),
  variants: {
    size: {
      sm: [typographyRecipe({ role: "textSmSemibold" })],
      md: [typographyRecipe({ role: "textMdSemibold" })],
      lg: [typographyRecipe({ role: "textLgSemibold" })],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const avatarStatus = recipe({
  base: style({
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "25%",
    height: "25%",
    borderRadius: "50%",
    zIndex: 1000,
    border: `2px solid ${vars.color.background.surface.default}`,
  }),
  variants: {
    status: {
      online: style({
        backgroundColor: vars.color.background.success.default,
      }),
      offline: style({
        backgroundColor: vars.color.background.base.default,
      }),
      away: style({
        backgroundColor: vars.color.background.warning.default,
      }),
      busy: style({
        backgroundColor: vars.color.background.danger.default,
      }),
    },
  },
});

export type AvatarContainerVariants = RecipeVariants<typeof avatarContainer>;
export type AvatarFallbackVariants = RecipeVariants<typeof avatarFallback>;
export type AvatarStatusVariants = RecipeVariants<typeof avatarStatus>;

export const AVATAR_STATUS = ["online", "offline", "away", "busy"] as const;
