import { style } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const containerRecipe = recipe({
  base: [
    style({
      display: "block",
      margin: "0 auto",
    }),
  ],
  variants: {
    size: {
      sm: {
        maxWidth: vars.layout.container.maxWidth.sm,
        padding: vars.layout.container.padding.sm,
      },
      md: {
        maxWidth: vars.layout.container.maxWidth.md,
        padding: vars.layout.container.padding.md,
      },
      lg: {
        maxWidth: vars.layout.container.maxWidth.lg,
        padding: vars.layout.container.padding.lg,
      },
      xl: {
        maxWidth: vars.layout.container.maxWidth.xl,
        padding: vars.layout.container.padding.xl,
      },
      "2xl": {
        maxWidth: vars.layout.container.maxWidth["2xl"],
        padding: vars.layout.container.padding["2xl"],
      },
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export type ContainerRecipeVariants = RecipeVariants<typeof containerRecipe>;

export const sectionRecipe = recipe({
  base: [
    style({
      display: "block",
    }),
  ],
  variants: {
    size: {
      sm: {
        padding: vars.layout.section.padding.sm,
        margin: vars.layout.section.margin.sm,
      },
      md: {
        padding: vars.layout.section.padding.md,
        margin: vars.layout.section.margin.md,
      },
      lg: {
        padding: vars.layout.section.padding.md,
        margin: vars.layout.section.margin.lg,
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SectionRecipeVariants = RecipeVariants<typeof sectionRecipe>;

export const stackRecipe = recipe({
  base: { display: "flex" },
  variants: {
    gap: {
      xs: { gap: vars.layout.flex.gap.xs },
      sm: { gap: vars.layout.flex.gap.sm },
      md: { gap: vars.layout.flex.gap.md },
      lg: { gap: vars.layout.flex.gap.lg },
      xl: { gap: vars.layout.flex.gap.xl },
    },
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
      around: { justifyContent: "space-around" },
      evenly: { justifyContent: "space-evenly" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
    },
  },
  defaultVariants: {
    gap: "md",
    direction: "row",
  },
});

// Stack Types

export type StackRecipeVariants = RecipeVariants<typeof stackRecipe>;

export const STACK_GAP = ["xs", "sm", "md", "lg", "xl"] as const;

export const STACK_DIRECTION = ["row", "column"] as const;

export const STACK_JUSTIFICATION = [
  "start",
  "center",
  "end",
  "between",
  "around",
  "evenly",
] as const;

export const STACK_ALIGNMENT = ["start", "center", "end", "stretch"] as const;

export type StackGap = (typeof STACK_GAP)[number];

export type StackDirection = (typeof STACK_DIRECTION)[number];

export type StackJustification = (typeof STACK_JUSTIFICATION)[number];

export type StackAlignment = (typeof STACK_ALIGNMENT)[number];

export const gridRecipe = recipe({
  base: {
    display: "grid",
  },
  variants: {
    /** gap scale (layout.json 기반) */
    gap: {
      xs: { gap: vars.layout.grid.gap.xs },
      sm: { gap: vars.layout.grid.gap.sm },
      md: { gap: vars.layout.grid.gap.md },
      lg: { gap: vars.layout.grid.gap.lg },
      xl: { gap: vars.layout.grid.gap.xl },
    },

    /** padding scale */
    padding: {
      xs: { padding: vars.layout.grid.padding.xs },
      sm: { padding: vars.layout.grid.padding.sm },
      md: { padding: vars.layout.grid.padding.md },
      lg: { padding: vars.layout.grid.padding.lg },
      xl: { padding: vars.layout.grid.padding.xl },
    },

    /** grid-template-columns scale */
    columns: {
      1: { gridTemplateColumns: "repeat(1, 1fr)" },
      2: { gridTemplateColumns: "repeat(2, 1fr)" },
      3: { gridTemplateColumns: "repeat(3, 1fr)" },
      4: { gridTemplateColumns: "repeat(4, 1fr)" },
      6: { gridTemplateColumns: "repeat(6, 1fr)" },
      8: { gridTemplateColumns: "repeat(8, 1fr)" },
      12: { gridTemplateColumns: "repeat(12, 1fr)" },
      auto: { gridTemplateColumns: "auto-fit" },
    },

    /** align-items 옵션 */
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
    },

    /** justify-content 옵션 */
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
      around: { justifyContent: "space-around" },
      evenly: { justifyContent: "space-evenly" },
    },

    /** inline grid 여부 */
    inline: {
      true: { display: "inline-grid" },
    },
  },

  defaultVariants: {
    gap: "md",
    padding: "md",
    columns: 3,
    align: "start",
    justify: "start",
  },
});

// Grid Types

export type GridRecipeVariants = RecipeVariants<typeof gridRecipe>;

export const GRID_GAP = ["xs", "sm", "md", "lg", "xl"] as const;

export const GRID_PADDING = ["xs", "sm", "md", "lg", "xl"] as const;

export const GRID_JUSTIFICATION = [
  "start",
  "center",
  "end",
  "between",
  "around",
  "evenly",
] as const;

export const GRID_ALIGNMENT = ["start", "center", "end", "stretch"] as const;

export type GridJustification = (typeof GRID_JUSTIFICATION)[number];

export type GridAlignment = (typeof GRID_ALIGNMENT)[number];

export type GridGap = (typeof GRID_GAP)[number];

export type GridPadding = (typeof GRID_PADDING)[number];
