import { getComponent } from "../../registry";
import { type TreeNode } from "../../types";
import { TableCellInput } from "./tree-node-table-cell-input";
import { DeleteRowButton } from "./tree-node-table-actions";

interface TableBodyProps {
  tbody: TreeNode | undefined;
  tbodyRows: TreeNode[];
  isHovered: boolean;
  rowCount: number;
  onUpdateCell: (rowIndex: number, colIndex: number, value: string) => void;
  onRemoveRow: (rowIndex: number) => void;
}

const Tbody = getComponent("Tbody");
const Tr = getComponent("Tr");
const Td = getComponent("Td");

export function TableBody({
  tbody,
  tbodyRows,
  isHovered,
  rowCount,
  onUpdateCell,
  onRemoveRow,
}: TableBodyProps) {
  if (!tbody) return null;

  return (
    <Tbody>
      {tbodyRows.map((trNode, rowIndex) => (
        <Tr key={trNode.id} style={{ position: "relative" }}>
          {trNode.children.map((tdNode, colIndex) => (
            <Td key={tdNode.id}>
              <TableCellInput
                value={tdNode.props.children as string}
                onChange={(value) => onUpdateCell(rowIndex, colIndex, value)}
                borderColor="#2196F3"
              />
            </Td>
          ))}
          <Td
            style={{
              position: "absolute",
              right: "0px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <DeleteRowButton
              isHovered={isHovered}
              rowCount={rowCount}
              onDelete={() => onRemoveRow(rowIndex)}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
}
