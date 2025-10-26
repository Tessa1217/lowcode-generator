import { Plus, X, Minus } from "lucide-react";

type TableActionButtonsProps = {
  isHovered: boolean;
  onAddColumn: () => void;
  onAddRow: () => void;
};

const TableActionButtons = ({
  isHovered,
  onAddColumn,
  onAddRow,
}: TableActionButtonsProps) => {
  return (
    <>
      <button
        onClick={onAddColumn}
        className={`table-btn table-col-add-btn ${isHovered ? "hovered" : ""}`}
        aria-label="열 추가"
        title="열 추가"
      >
        <Plus />
      </button>

      <button
        onClick={onAddRow}
        className={`table-btn table-row-add-btn ${isHovered ? "hovered" : ""}`}
        aria-label="행 추가"
        title="행 추가"
      >
        <Plus />
      </button>
    </>
  );
};

type DeleteColumnButtonProps = {
  isHovered: boolean;
  colCount: number;
  onDelete: () => void;
};

const DeleteColumnButton = ({
  isHovered,
  colCount,
  onDelete,
}: DeleteColumnButtonProps) => {
  if (!isHovered || colCount <= 1) return null;

  return (
    <button
      onClick={onDelete}
      className={`table-btn table-delete-btn ${isHovered ? "hovered" : ""}`}
      aria-label="열 삭제"
      title="열 삭제"
    >
      <X />
    </button>
  );
};

type DeleteRowButtonProps = {
  isHovered: boolean;
  rowCount: number;
  onDelete: () => void;
};

const DeleteRowButton = ({
  isHovered,
  rowCount,
  onDelete,
}: DeleteRowButtonProps) => {
  if (!isHovered || rowCount <= 1) return null;

  return (
    <button
      onClick={onDelete}
      className={`table-btn table-row-delete-btn ${isHovered ? "hovered" : ""}`}
      aria-label="행 삭제"
      title="행 삭제"
    >
      <Minus />
    </button>
  );
};

export { TableActionButtons, DeleteColumnButton, DeleteRowButton };
