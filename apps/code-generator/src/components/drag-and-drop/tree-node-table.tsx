import { useRef } from "react";
import { getComponent } from "@packages/ui";
import { type TreeNode } from "../../types";
import { useSortableDragAndHover } from "../../hooks/useSortableDragAndHover";
import { useTreeStore } from "../../store/treeStore";
import { useTableNodeEdit } from "../../hooks/useTableNodeEdit";
import { TableActionButtons } from "./tree-node-table-actions";
import { TableBody } from "./tree-node-table-body";
import { TableHead } from "./tree-node-table-head";
import { TreeNodeActionsPortal } from "./tree-node-actions-portal";
import "./tree-node-table.css";

interface TableNodeTreeProps {
  rootNode: TreeNode;
}

const Table = getComponent("Table");

export function TableNodeTree({ rootNode }: TableNodeTreeProps) {
  const {
    effectiveHover,
    handleMouseEnter,
    handleMouseLeave,
    setIsActionsHovered,
    dragProps,
    handleMouseDown,
  } = useSortableDragAndHover(rootNode);

  const nodeRef = useRef<HTMLElement>(null);

  const { removeNodeById } = useTreeStore();

  const handleDelete = () => {
    removeNodeById(rootNode.id);
  };

  const {
    addColumn,
    removeColumn,
    addRow,
    removeRow,
    updateCellContent,
    getSectionNodes,
  } = useTableNodeEdit(rootNode);

  const { thead, tbody, theadRow, tbodyRows, colCount, rowCount } =
    getSectionNodes(rootNode);

  // 헤더 셀 업데이트 핸들러
  const handleUpdateHeadCell = (colIndex: number, value: string) => {
    updateCellContent("thead", 0, colIndex, value);
  };

  // 바디 셀 업데이트 핸들러
  const handleUpdateBodyCell = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    updateCellContent("tbody", rowIndex, colIndex, value);
  };

  return (
    <div
      ref={(el: HTMLElement | null) => {
        if (dragProps.ref) dragProps.ref(el);
        nodeRef.current = el;
      }}
      style={dragProps.style}
      className="table-tree-node"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDownCapture={handleMouseDown}
    >
      <TableActionButtons
        isHovered={effectiveHover}
        onAddColumn={addColumn}
        onAddRow={addRow}
      />
      <Table {...rootNode.props}>
        <TableHead
          thead={thead}
          theadRow={theadRow}
          isHovered={effectiveHover}
          colCount={colCount}
          onUpdateCell={handleUpdateHeadCell}
          onRemoveColumn={removeColumn}
        />

        <TableBody
          tbody={tbody}
          tbodyRows={tbodyRows}
          isHovered={effectiveHover}
          rowCount={rowCount}
          onUpdateCell={handleUpdateBodyCell}
          onRemoveRow={removeRow}
        />
      </Table>
      <TreeNodeActionsPortal
        targetRef={nodeRef}
        node={rootNode}
        isHovered={effectiveHover}
        setActivatorNodeRef={dragProps.setActivatorNodeRef}
        dragAttributes={dragProps.attributes}
        dragListeners={dragProps.listeners}
        isDragging={dragProps.isDragging}
        componentName={rootNode.componentName}
        onDelete={handleDelete}
        onHoverChange={setIsActionsHovered}
      />
    </div>
  );
}
