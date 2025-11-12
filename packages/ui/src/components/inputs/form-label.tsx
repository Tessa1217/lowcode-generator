import type { Ref, HTMLAttributes } from "react";
import {
  type FormLabelVariants,
  formLabel,
  requiredIndicator,
} from "./form-label.css";

export type FormLabelProps = HTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  ref?: Ref<HTMLLabelElement>;
  htmlFor?: string;
} & FormLabelVariants;

export function FormLabel({
  required,
  labelSize,
  htmlFor,
  children,
  ref,
  ...props
}: FormLabelProps) {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={formLabel({ labelSize })}
      {...props}
    >
      {children}
      {required && (
        <span className={requiredIndicator} aria-label="required">
          *
        </span>
      )}
    </label>
  );
}
