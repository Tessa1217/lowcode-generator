import type { Ref, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { formField, type FormFieldVariants } from "./form-field.css";

export type FormFieldProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  ref?: Ref<HTMLDivElement>;
} & FormFieldVariants;

export function FormField({
  className,
  ref,
  spacing,
  children,
  ...props
}: FormFieldProps) {
  const classNames = cn(formField({ spacing }), className);

  return (
    <div ref={ref} className={classNames} {...props}>
      {children}
    </div>
  );
}
