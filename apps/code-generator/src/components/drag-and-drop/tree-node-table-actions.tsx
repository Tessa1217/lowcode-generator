import { Plus, X, Minus } from "lucide-react";
import { cn } from "@packages/ui";
import {
  colAddButton,
  rowAddButton,
  tableButton,
  tableDeleteButton,
} from "./tree-node.css";
interface TableActionButtonsProps {
  isHovered: boolean;
  onAddColumn: () => void;
  onAddRow: () => void;
}

export function TableActionButtons({
  isHovered,
  onAddColumn,
  onAddRow,
}: TableActionButtonsProps) {
  return (
    <>
      <button
        onClick={onAddColumn}
        className={cn(
          tableButton({ hovered: isHovered }),
          colAddButton({ hovered: isHovered })
        )}
        aria-label="열 추가"
        title="열 추가"
      >
        <Plus />
      </button>

      <button
        onClick={onAddRow}
        className={cn(
          tableButton({ hovered: isHovered }),
          rowAddButton({ hovered: isHovered })
        )}
        aria-label="행 추가"
        title="행 추가"
      >
        <Plus />
      </button>
    </>
  );
}

type DeleteColumnButtonProps = {
  isHovered: boolean;
  colCount: number;
  onDelete: () => void;
};

export function DeleteColumnButton({
  isHovered,
  colCount,
  onDelete,
}: DeleteColumnButtonProps) {
  if (!isHovered || colCount <= 1) return null;

  return (
    <button
      onClick={onDelete}
      className={cn(
        tableButton({ hovered: isHovered }),
        tableDeleteButton({ direction: "col" })
      )}
      aria-label="열 삭제"
      title="열 삭제"
    >
      <X />
    </button>
  );
}

type DeleteRowButtonProps = {
  isHovered: boolean;
  rowCount: number;
  onDelete: () => void;
};

export function DeleteRowButton({
  isHovered,
  rowCount,
  onDelete,
}: DeleteRowButtonProps) {
  if (!isHovered || rowCount <= 1) return null;

  return (
    <button
      onClick={onDelete}
      className={cn(
        tableButton({ hovered: isHovered }),
        tableDeleteButton({ direction: "row" })
      )}
      aria-label="행 삭제"
      title="행 삭제"
    >
      <Minus />
    </button>
  );
}
