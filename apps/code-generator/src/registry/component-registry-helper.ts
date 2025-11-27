import type { ComponentType } from "./types";
import {
  ComponentRegistry,
  ComponentsByCategory,
  type ComponentName,
  type ComponentMeta,
  type ComponentCategory,
  type ComponentItem,
} from "./component-registry";

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

export function getComponentItem(name: ComponentName): ComponentItem {
  const item = ComponentRegistry[name];
  return {
    name,
    component: item.component,
    meta: item.meta,
  };
}

export function getComponentsByCategory(
  category: ComponentCategory
): ComponentItem[] {
  const componentNames = ComponentsByCategory[category];
  return componentNames.map((name) => {
    const componentName = name as ComponentName;
    const item = ComponentRegistry[componentName];
    const componentItem = {
      name,
      component: item.component,
      meta: item.meta,
    } as ComponentItem;
    return componentItem;
  });
}
