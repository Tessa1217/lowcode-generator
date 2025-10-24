import "./styles/theme.css";

export type {
  ComponentMetaDefinition,
  PropsMeta,
  ControlType,
} from "./types/meta";

// Component Registry
export {
  TableComponentRegistry,
  ComponentRegistry,
  ComponentsByCategory,
  getComponent,
  getComponentMeta,
  getAllComponents,
} from "./registry";
export type {
  ComponentName,
  ComponentMeta,
  ComponentRegistryItem,
  ComponentType,
  ComponentCategoryName,
  ComponentItem,
} from "./registry";
