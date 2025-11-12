import type { ComponentMetaDefinition } from "./types/meta";

// layout
import { Container } from "./components/layout/container";
import { ContainerMeta } from "./components/layout/container.meta";
import { Section } from "./components/layout/section";
import { SectionMeta } from "./components/layout/section.meta";
import { Stack } from "./components/layout/stack";
import { StackMeta } from "./components/layout/stack.meta";
import { Grid } from "./components/layout/grid";
import { GridMeta } from "./components/layout/grid.meta";

// display
import { Typography } from "./components/display/typography";
import { TypographyMeta } from "./components/display/typography.meta";
import { Pagination } from "./components/display/pagination";
import { PaginationMeta } from "./components/display/pagination.meta";
import {
  Table,
  Tbody,
  Thead,
  TableCaption,
  Tr,
  Td,
  Th,
} from "./components/display/table";
import {
  TableMeta,
  TbodyMeta,
  TheadMeta,
  TableCaptionMeta,
  TrMeta,
  TdMeta,
  ThMeta,
} from "./components/display/table.meta";

// ui
import { Button } from "./components/ui/button";
import { ButtonMeta } from "./components/ui/button.meta";
import { Divider } from "./components/ui/divider";
import { DividerMeta } from "./components/ui/divider.meta";

// inputs
import { Input } from "./components/inputs/input";
import { InputMeta } from "./components/inputs/input.meta";
import { Checkbox } from "./components/inputs/checkbox";
import { CheckboxMeta } from "./components/inputs/checkbox.meta";
import { Radio } from "./components/inputs/radio";
import { RadioMeta } from "./components/inputs/radio.meta";
import { Textarea } from "./components/inputs/textarea";
import { TextareaMeta } from "./components/inputs/textarea.meta";
import { Select } from "./components/inputs/select";
import { SelectMeta } from "./components/inputs/select.meta";
import { FormField } from "./components/inputs/form-field";
import { FormFieldMeta } from "./components/inputs/form-field.meta";
import { FormLabel } from "./components/inputs/form-label";
import { FormLabelMeta } from "./components/inputs/form-label.meta";

export type ComponentType =
  | React.ComponentType<any>
  | React.ExoticComponent<any>;

export interface ComponentRegistryItem {
  hidden?: boolean;
  component: React.ComponentType<any> | React.ExoticComponent<any>;
  meta: ComponentMetaDefinition;
}

export const DisplayComponentRegistry = {
  Typography: {
    component: Typography,
    meta: TypographyMeta,
  },
  Pagination: {
    component: Pagination,
    meta: PaginationMeta,
  },
  Table: {
    component: Table,
    meta: TableMeta,
  },
};

export const UiComponentRegistry = {
  Button: {
    component: Button,
    meta: ButtonMeta,
  },
  Divider: {
    component: Divider,
    meta: DividerMeta,
  },
};

export const LayoutComponentRegistry = {
  Container: {
    component: Container,
    meta: ContainerMeta,
  },
  Section: {
    component: Section,
    meta: SectionMeta,
  },
  Stack: {
    component: Stack,
    meta: StackMeta,
  },
  Grid: {
    component: Grid,
    meta: GridMeta,
  },
};

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
};

export const TableComponentRegistry = {
  Tbody: {
    hidden: true,
    component: Tbody,
    meta: TbodyMeta,
  },
  Thead: {
    hidden: true,
    component: Thead,
    meta: TheadMeta,
  },
  TableCaption: {
    hidden: true,
    component: TableCaption,
    meta: TableCaptionMeta,
  },
  Tr: {
    hidden: true,
    component: Tr,
    meta: TrMeta,
  },
  Th: {
    hidden: true,
    component: Th,
    meta: ThMeta,
  },
  Td: {
    hidden: true,
    component: Td,
    meta: TdMeta,
  },
};

// 내부 전용 Text 노드 타입 (children으로 텍스트가 들어가는 경우)
export const InternalComponentRegistry = {
  Text: {
    component: (props: { children: string }) => props.children,
    meta: {
      component: "Text",
      category: "Internal",
      description: "단순 텍스트 노드 (내부 전용)",
      hasChildren: false,
      props: {
        children: {
          control: "text",
          default: "",
          description: "표시할 문자열",
        },
      },
      scaffold: `<Text>텍스트</Text>`, // 직렬화 포맷 상의 표현
      renderPreview: (_Component, props) => props.children,
    } satisfies ComponentMetaDefinition,
  },
};

export const ComponentRegistry = {
  ...LayoutComponentRegistry,
  ...DisplayComponentRegistry,
  ...UiComponentRegistry,
  ...FormComponentRegistry,
  ...TableComponentRegistry,
  ...InternalComponentRegistry,
} as const;

export type ComponentName = keyof typeof ComponentRegistry;
export type ComponentMeta = (typeof ComponentRegistry)[ComponentName]["meta"];

export const ComponentsByCategory = {
  Layout: [...Object.keys(LayoutComponentRegistry)] as const,
  Display: [...Object.keys(DisplayComponentRegistry)] as const,
  UI: [...Object.keys(UiComponentRegistry)] as const,
  Forms: [...Object.keys(FormComponentRegistry)] as const,
} as const;

export type ComponentCategoryName = keyof typeof ComponentsByCategory;
export type ComponentItem =
  (typeof ComponentsByCategory)[ComponentCategoryName][number];

export function getComponent(name: ComponentName): ComponentType {
  return ComponentRegistry[name]?.component;
}

export function getComponentMeta(name: ComponentName): ComponentMeta {
  return ComponentRegistry[name]?.meta;
}

export function getAllComponents() {
  return Object.entries(ComponentRegistry).map(([name, item]) => ({
    name,
    component: item.component,
    meta: item.meta,
  }));
}
