import { forwardRef, type HTMLAttributes, type CSSProperties } from "react";
import {
  sectionRecipe,
  type SectionRecipeVariants,
} from "@packages/vanilla-extract-config";

export type SectionProps = HTMLAttributes<HTMLElement> &
  SectionRecipeVariants & {
    minHeight?: string | number;
  };

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ size = "md", minHeight, className, style, children, ...props }, ref) => {
    const classNames = [sectionRecipe({ size }), className]
      .filter(Boolean)
      .join(" ");

    const sectionStyle = minHeight
      ? {
          minHeight:
            typeof minHeight === "number" ? `${minHeight}px` : minHeight,
        }
      : {};

    return (
      <section
        ref={ref}
        className={classNames}
        style={{ ...sectionStyle, ...style }}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
