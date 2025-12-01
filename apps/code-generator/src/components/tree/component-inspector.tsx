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

interface ComponentInspectorProps {
  node: Node | null;
}

export function ComponentInspector({ node }: ComponentInspectorProps) {
  if (!node) {
    return (
      <div className={emptyPropsContainer}>
        속성을 확인할 노드를 선택해주세요.
      </div>
    );
  }

  const data = node.data as ComponentNodeData;
  const metaEntries = data.meta ? Object.entries(data.meta) : [];
  const propsEntries = data.props ? Object.entries(data.props) : [];

  return (
    <div className={componentPropsContainer}>
      <h3 className={componentPropsTitle}>{data.label}</h3>
      <PropertySection title="Metadata">
        <PropertyList
          entries={metaEntries}
          emptyMessage="메타 데이터가 없습니다."
          filterFn={([_, value]) => typeof value === "string"}
        />
      </PropertySection>
      <PropertySection title="Properties">
        <PropertyList
          entries={propsEntries}
          emptyMessage="지정 가능한 속성이 없습니다."
        />
      </PropertySection>
    </div>
  );
}

type PropertyEntry = [string, unknown];

interface PropertyListProps {
  entries: PropertyEntry[];
  emptyMessage: string;
  filterFn?: (entry: PropertyEntry) => boolean;
}

function PropertyList({ entries, emptyMessage, filterFn }: PropertyListProps) {
  const filteredEntries = filterFn ? entries.filter(filterFn) : entries;

  if (!filteredEntries.length) {
    return <div className={componentPropsGroupNoValue}>{emptyMessage}</div>;
  }

  return (
    <>
      {filteredEntries.map(([key, value]) => (
        <div key={key} className={componentPropsGroup}>
          <span className={componentPropsGroupTitle}>{key}</span>
          <ComponentPropertyRenderer value={value} />
        </div>
      ))}
    </>
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
