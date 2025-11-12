import type { HTMLAttributes, Ref } from "react";
import { cn } from "../../utils/cn";
import { type CardVariants, card } from "./card.css";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
  children?: React.ReactNode;
} & CardVariants;

export function Card({
  ref,
  children,
  variant,
  padding,
  className,
  ...props
}: CardProps) {
  const classNames = cn(card({ variant, padding }), className);
  return (
    <div ref={ref} className={classNames} {...props}>
      {children}
    </div>
  );
}
