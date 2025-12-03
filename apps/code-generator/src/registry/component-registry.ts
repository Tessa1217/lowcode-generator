import type { ComponentMetaDefinition, ComponentType } from "./types";

export interface ComponentRegistryItem {
  hidden?: boolean;
  component: ComponentType;
  meta: ComponentMetaDefinition;
}

import { LayoutComponentRegistry } from "./category/layout.registry";
import { DisplayComponentRegistry } from "./category/display.registry";
import { UiComponentRegistry } from "./category/ui.regsitry";
import { FormComponentRegistry } from "./category/form.registry";
import { TableComponentRegistry } from "./category/table.registry";
import { InternalComponentRegistry } from "./category/internal.registry";

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
export interface ComponentItem {
  name: ComponentName;
  component: ComponentType;
  meta: ComponentMeta;
}

export const COMPONENT_CATEGORIES = {
  Layout: "Layout",
  Display: "Display",
  UI: "UI",
  Forms: "Forms",
} as const;

export type ComponentCategory = keyof typeof COMPONENT_CATEGORIES;

export const ComponentsByCategory = {
  [COMPONENT_CATEGORIES.Layout]: Object.keys(LayoutComponentRegistry),
  [COMPONENT_CATEGORIES.Display]: Object.keys(DisplayComponentRegistry),
  [COMPONENT_CATEGORIES.UI]: Object.keys(UiComponentRegistry),
  [COMPONENT_CATEGORIES.Forms]: Object.keys(FormComponentRegistry),
} as const;
