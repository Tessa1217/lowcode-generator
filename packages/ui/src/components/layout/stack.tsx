import { forwardRef, type HTMLAttributes } from "react";
import { stackRecipe } from "@packages/vanilla-extract-config";
import { type RecipeVariants } from "@vanilla-extract/recipes";

export type StackVariants = RecipeVariants<typeof stackRecipe>;

export type StackProps = HTMLAttributes<HTMLDivElement> &
  StackVariants & {
    children?: React.ReactNode;
  };

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ gap, justify, align, direction, className, children, ...props }, ref) => {
    const classNames = [
      stackRecipe({ gap, justify, align, direction }),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

export { Stack };
