import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {
  getComponentMeta,
  getComponent,
  type ComponentType,
} from "../../registry";
import { useSortableDragAndHover } from "../../hooks/useSortableDragAndHover";
import { useTreeStore } from "../../store/treeStore";
import { type TreeNode } from "../../types";
import { TableNodeTree } from "./tree-node-table";
import { TreeNodeContainer } from "./tree-node-container";
import { TreeNodeInline } from "./tree-node-inline";
import "./tree-node.css";

export interface BaseNodeProps {
  node: TreeNode;
  dragProps: ReturnType<typeof useSortableDragAndHover>["dragProps"];
  effectiveHover: boolean;
  handleMouseEnter: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleDelete: () => void;
  setIsActionsHovered: (hovered: boolean) => void;
  Component: ComponentType;
}

interface TreeNodeComponentProps {
  node: TreeNode;
}

function TreeNode({ node }: TreeNodeComponentProps) {
  const meta = getComponentMeta(node.componentName);
  const Component = getComponent(node.componentName) as ComponentType;
  const canHaveChildren = meta?.hasChildren;

  const { removeNodeById } = useTreeStore();

  const handleDelete = () => {
    removeNodeById(node.id);
  };

  const {
    effectiveHover,
    setIsActionsHovered,
    handleMouseEnter,
    handleMouseLeave,
    dragProps,
    handleMouseDown,
  } = useSortableDragAndHover(node);

  // children 렌더링
  const renderChildren = () => {
    if (node.children.length > 0) {
      return <TreeRenderer nodes={node.children} />;
    }
    if (node.props.children) {
      return node.props.children as React.ReactNode;
    }
    return <EmptyDropZone />;
  };

  // 일반 컴포넌트 중 children을 가질 수 있는 경우
  if (canHaveChildren) {
    return (
      <TreeNodeContainer
        node={node}
        dragProps={dragProps}
        effectiveHover={effectiveHover}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleMouseDown={handleMouseDown}
        handleDelete={handleDelete}
        setIsActionsHovered={setIsActionsHovered}
        Component={Component}
      >
        {renderChildren()}
      </TreeNodeContainer>
    );
  }

  // 일반 요소 (children 없음) - inline 요소들
  return (
    <TreeNodeInline
      node={node}
      dragProps={dragProps}
      effectiveHover={effectiveHover}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      handleMouseDown={handleMouseDown}
      handleDelete={handleDelete}
      setIsActionsHovered={setIsActionsHovered}
      Component={Component}
    />
  );
}

// 테이블 노드
function TableNode({ node }: { node: TreeNode }) {
  return <TableNodeTree rootNode={node} />;
}

// 일반 텍스트 노드
function TextNode({ node }: { node: TreeNode }) {
  return <>{node.props.children}</>;
}

// 빈 드롭 존
function EmptyDropZone() {
  return <div className="empty-drop-zone">Drop here to nest</div>;
}

// 트리 노드 컴포넌트
function TreeNodeComponent({ node }: TreeNodeComponentProps) {
  if (node.componentName === "Table") {
    return <TableNode node={node} />;
  }

  if (node.componentName === "Text") {
    return <TextNode node={node} />;
  }

  return <TreeNode node={node} />;
}

interface TreeRendererProps {
  nodes: TreeNode[];
}

// 트리 Renderer
export function TreeRenderer({ nodes }: TreeRendererProps) {
  if (nodes.length === 0) return null;

  return (
    <SortableContext
      items={nodes.map((n) => n.id)}
      strategy={rectSortingStrategy}
    >
      {nodes.map((node) => (
        <TreeNodeComponent key={node.id} node={node} />
      ))}
    </SortableContext>
  );
}
