import { Undo, Redo } from "lucide-react";
import { useHistoryStore } from "../../store/historyStore";

export function HistoryControls() {
  const { undo, redo, canUndo, canRedo } = useHistoryStore();

  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const undoShortcut = isMac ? "⌘Z" : "Ctrl+Z";
  const redoShortcut = isMac ? "⌘⇧Z" : "Ctrl+Y";

  return (
    <div className="history-controls">
      <button
        className="history-btn"
        onClick={undo}
        disabled={!canUndo}
        title={`Undo (${undoShortcut})`}
        aria-label="Undo"
      >
        <Undo size={18} />
      </button>

      <button
        className="history-btn"
        onClick={redo}
        disabled={!canRedo}
        title={`Redo (${redoShortcut})`}
        aria-label="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
}
