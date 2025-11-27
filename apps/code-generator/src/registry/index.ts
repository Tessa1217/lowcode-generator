// registry 타입 (메타, 컨트롤 타입 등)
export type {
  ControlType,
  PropsMeta,
  ComponentProps,
  ComponentMetaDefinition,
  ComponentType,
} from "./types";

// component registry (컴포넌트 모음)
export {
  ComponentRegistry,
  ComponentsByCategory,
  COMPONENT_CATEGORIES,
} from "./component-registry";

// registry types
export type {
  ComponentRegistryItem,
  ComponentName,
  ComponentMeta,
  ComponentCategory,
  ComponentItem,
} from "./component-registry";

// component 관련 helper 함수
export {
  getComponent,
  getComponentMeta,
  getComponentItem,
  getAllComponents,
  getComponentsByCategory,
} from "./component-registry-helper";
