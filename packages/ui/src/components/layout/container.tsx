import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import {
  containerRecipe,
  type ContainerRecipeVariants,
} from "@packages/vanilla-extract-config";

export type ContainerProps = HTMLAttributes<HTMLDivElement> &
  ContainerRecipeVariants & {
    minHeight: string | number;
  };

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "lg", minHeight, className, style, children, ...props }, ref) => {
    const classNames = [containerRecipe({ size }), className]
      .filter(Boolean)
      .join(" ");

    const containerStyle: CSSProperties = minHeight
      ? {
          minHeight:
            typeof minHeight === "string" ? minHeight : `${minHeight}px`,
        }
      : { minHeight: "100svh" };

    return (
      <div
        ref={ref}
        className={classNames}
        style={{ ...containerStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };
