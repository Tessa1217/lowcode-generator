import { getComponentMeta } from "../registry";
import { useTreeStore } from "../store/treeStore";
import { type TreeNode } from "../types";
import { safeClone } from "../utils/safeClone";

export const useTableNodeEdit = (node: TreeNode) => {
  const { updateNodeById } = useTreeStore.getState();

  const getSectionNodes = (target: TreeNode) => {
    const thead = target.children.find((c) => c.componentName === "Thead");
    const tbody = target.children.find((c) => c.componentName === "Tbody");
    const theadRow = thead?.children?.[0];
    const tbodyRows = tbody?.children ?? [];
    const colCount = theadRow?.children?.length ?? 0;
    const rowCount = tbodyRows.length;

    return { thead, tbody, theadRow, tbodyRows, colCount, rowCount };
  };

  const cloneNode = (n: TreeNode): TreeNode => {
    const cloned: TreeNode = safeClone({
      ...n,
      meta: undefined,
      children: n.children.map((child) => cloneNode(child)),
    });
    cloned.meta = getComponentMeta(n.componentName);
    return cloned;
  };

  /** 열 추가 */
  const addColumn = () => {
    const updated = cloneNode(node);
    const { thead, tbody, theadRow, colCount } = getSectionNodes(updated);

    if (!thead || !tbody || !theadRow) return;

    theadRow.children.push({
      id: `node-${crypto.randomUUID()}`,
      componentName: "Th",
      props: { children: `제목 ${colCount + 1}` },
      meta: getComponentMeta("Th"),
      children: [],
    });

    tbody.children.forEach((tr) => {
      tr.children.push({
        id: `node-${crypto.randomUUID()}`,
        componentName: "Td",
        props: { children: "내용" },
        meta: getComponentMeta("Td"),
        children: [],
      });
    });

    updateNodeById(node.id, updated);
  };

  /** 열 삭제 */
  const removeColumn = (colIndex: number) => {
    const updated = cloneNode(node);
    const { thead, tbody, colCount, theadRow } = getSectionNodes(updated);
    if (!thead || !tbody || colCount <= 1 || !theadRow) return;

    theadRow.children.splice(colIndex, 1);
    tbody.children.forEach((tr) => tr.children.splice(colIndex, 1));

    updateNodeById(node.id, updated);
  };

  // 행 추가
  const addRow = () => {
    const updated = cloneNode(node);
    const { tbody, colCount } = getSectionNodes(updated);
    if (!tbody) return;

    const newRow: TreeNode = {
      id: `node-${crypto.randomUUID()}`,
      componentName: "Tr",
      props: {},
      meta: getComponentMeta("Tr"),
      children: Array.from({ length: colCount }, (_, i) => ({
        id: `node-${crypto.randomUUID()}`,
        componentName: "Td",
        props: { children: `내용 ${i + 1}` },
        meta: getComponentMeta("Td"),
        children: [],
      })),
    };
    tbody.children.push(newRow);

    updateNodeById(node.id, updated);
  };

  // 행 삭제
  const removeRow = (rowIndex: number) => {
    const updated = cloneNode(node);
    const { tbody, rowCount } = getSectionNodes(updated);
    if (!tbody || rowCount <= 1) return;

    tbody.children.splice(rowIndex, 1);
    updateNodeById(node.id, updated);
  };

  // 셀 내용 수정
  const updateCellContent = (
    section: "thead" | "tbody",
    rowIndex: number,
    colIndex: number,
    content: string
  ) => {
    const updated = cloneNode(node);
    const sectionNode = updated.children.find(
      (c) => c.componentName === (section === "thead" ? "Thead" : "Tbody")
    );
    if (!sectionNode) return;

    const rowNode = sectionNode.children[rowIndex];
    if (!rowNode) return;
    const cellNode = rowNode.children[colIndex];
    if (!cellNode) return;
    cellNode.props = { ...cellNode.props, children: content };

    updateNodeById(node.id, updated);
  };

  return {
    addColumn,
    removeColumn,
    addRow,
    removeRow,
    updateCellContent,
    getSectionNodes,
  };
};
