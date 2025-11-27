// Component
import {
  FormField,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Radio,
  Textarea,
} from "@packages/ui";
// 메타 파일
import { FormFieldMeta } from "../meta/form-field.meta";
import { FormLabelMeta } from "../meta/form-label.meta";
import { InputMeta } from "../meta/input.meta";
import { SelectMeta } from "../meta/select.meta";
import { CheckboxMeta } from "../meta/checkbox.meta";
import { RadioMeta } from "../meta/radio.meta";
import { TextareaMeta } from "../meta/textarea.meta";

/**
 * Form 컴포넌트 Registry
 */
export const FormComponentRegistry = {
  FormField: {
    component: FormField,
    meta: FormFieldMeta,
  },
  FormLabel: {
    component: FormLabel,
    meta: FormLabelMeta,
  },
  Input: {
    component: Input,
    meta: InputMeta,
  },
  Select: {
    component: Select,
    meta: SelectMeta,
  },
  Checkbox: {
    component: Checkbox,
    meta: CheckboxMeta,
  },
  Radio: {
    component: Radio,
    meta: RadioMeta,
  },
  Textarea: {
    component: Textarea,
    meta: TextareaMeta,
  },
} as const;
