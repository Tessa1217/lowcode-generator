import { type ComponentName, getComponentMeta } from "../registry";

export function getDefaultProps(name: ComponentName): Record<string, unknown> {
  const meta = getComponentMeta(name);

  if (!meta?.props) {
    return {};
  }

  return Object.entries(meta.props).reduce((acc, [propName, propMeta]) => {
    // default 값이 있으면 사용, 없으면 control type에 따라 기본값 설정
    if (propMeta.default !== undefined) {
      acc[propName] = propMeta.default;
    } else {
      // default가 없을 때 control type별 fallback
      switch (propMeta.control) {
        case "boolean":
          acc[propName] = false;
          break;
        case "number":
          acc[propName] = 0;
          break;
        case "select":
          // options의 첫 번째 값 사용
          acc[propName] = propMeta.options?.[0] ?? "";
          break;
        default:
          acc[propName] = "";
      }
    }
    return acc;
  }, {} as Record<string, unknown>);
}
