import type { Ref, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import {
  type BadgeVariants,
  badge,
  BADGE_COLOR_VARIANTS,
  BADGE_SHAPES,
} from "./badge.css";

export { BADGE_COLOR_VARIANTS, BADGE_SHAPES };

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  ref?: Ref<HTMLSpanElement>;
  children?: React.ReactNode;
} & BadgeVariants;

export function Badge({
  color = "default",
  shape = "default",
  size = "md",
  ref,
  children,
  className,
  ...props
}: BadgeProps) {
  const classNames = cn(badge({ color, shape, size }), className);
  return (
    <span ref={ref} className={classNames} {...props}>
      {children}
    </span>
  );
}
