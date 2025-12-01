import type { Node } from "@xyflow/react";
import type { ComponentNodeData } from "./component-node";
import { ComponentPropertyRenderer } from "./component-property-renderer";
import {
  componentPropsContainer,
  componentPropsCategoryContainer,
  componentPropsCategoryTitle,
  emptyPropsContainer,
  componentPropsTitle,
  componentPropsGroup,
  componentPropsGroupTitle,
  componentPropsGroupNoValue,
} from "./tree-view.css";
type ComponentInspectorProps = {
  node: Node | null;
};

export function ComponentInspector({ node }: ComponentInspectorProps) {
  if (!node)
    return (
      <div className={emptyPropsContainer}>
        속성을 확인할 노드를 선택해주세요.
      </div>
    );

  const data = node.data as ComponentNodeData;

  return (
    <div className={componentPropsContainer}>
      <h3 className={componentPropsTitle}>{data.label}</h3>
      <PropertySection title="Metadata">
        {data.meta && Object.keys(data.meta).length ? (
          Object.entries(data.meta)
            .filter(([_, value]) => typeof value === "string")
            .map(([key, value]) => (
              <div key={key} className={componentPropsGroup}>
                <span className={componentPropsGroupTitle}>{key}</span>
                <p>{value}</p>
              </div>
            ))
        ) : (
          <div className={componentPropsGroupNoValue}>
            메타 데이터가 없습니다.
          </div>
        )}
      </PropertySection>
      <PropertySection title="Properties">
        {data.props && Object.keys(data.props).length ? (
          Object.entries(data.props).map(([key, value]) => (
            <div key={key} className={componentPropsGroup}>
              <span className={componentPropsGroupTitle}>{key}</span>
              <div>
                <ComponentPropertyRenderer value={value} />
              </div>
            </div>
          ))
        ) : (
          <div className={componentPropsGroupNoValue}>
            지정 가능한 속성이 없습니다.
          </div>
        )}
      </PropertySection>
    </div>
  );
}

function PropertySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={componentPropsCategoryContainer}>
      <div className={componentPropsCategoryTitle}>{title}</div>
      <div>{children}</div>
    </div>
  );
}
