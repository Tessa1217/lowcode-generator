import { type ComponentMeta, type ComponentProps } from "../../registry";

export interface ComponentPreviewProps {
  component: React.ElementType;
  meta: ComponentMeta;
  props?: ComponentProps;
}

export function ComponentPreview({
  component: Component,
  meta,
  props = {},
}: ComponentPreviewProps) {
  if (meta.renderPreview) {
    return <>{meta.renderPreview(Component, props)}</>;
  }

  if (meta.hasChildren) {
    return <Component {...props}>Preview</Component>;
  }

  return <Component {...props} />;
}
