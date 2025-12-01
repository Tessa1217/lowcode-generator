import { type ComponentMeta, type ComponentProps } from "../../registry";
import {
  thumbnail,
  miniPreview,
} from "../component-palette/component-palette.css";

export interface ComponentPreviewProps {
  component: React.ElementType;
  meta: ComponentMeta;
  props?: ComponentProps;
}

interface PreviewFrameProps {
  children: React.ReactNode;
}

export function PreviewFrame({ children }: PreviewFrameProps) {
  return (
    <div className={thumbnail()}>
      <div className={miniPreview}>{children}</div>
    </div>
  );
}

export function ComponentPreview({
  component: Component,
  meta,
  props = {},
}: ComponentPreviewProps) {
  if (meta.renderPreview) {
    return (
      <PreviewFrame>
        <>{meta.renderPreview(Component, props)}</>
      </PreviewFrame>
    );
    return;
  }

  if (meta.hasChildren) {
    return (
      <PreviewFrame>
        <Component {...props}>Preview</Component>
      </PreviewFrame>
    );
  }

  return (
    <PreviewFrame>
      <Component {...props} />
    </PreviewFrame>
  );
}
