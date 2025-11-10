import type { TreeNode } from "../types";
import { useEffect, useState } from "react";
import { useHistoryStore } from "../store/historyStore";
import { useTreeStore } from "../store/treeStore";
import { cloneNodeWithNewIds } from "../utils/treeHelper";

/**
 * 현재 input과 textarea 등 폼 요소에 포커스 있는지 확인
 * @returns 포커스 여부
 */
function isInputFocused(): boolean {
  const activeElement = document.activeElement;
  return (
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    (activeElement instanceof HTMLElement && activeElement.isContentEditable)
  );
}

export function useKeyboardShortcuts() {
  const { undo, redo, canUndo, canRedo } = useHistoryStore();
  const [clipboard, setClipboard] = useState<TreeNode | null>(null);

  const {
    selectedNode,
    duplicateNode,
    setSelectedNode,
    insertIntoContainer,
    insertNodeAfter,
    removeNodeById,
    moveNodeDown,
    moveNodeUp,
  } = useTreeStore();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Undo
      if (cmdOrCtrl && e.key === "z" && !e.shiftKey && canUndo) {
        e.preventDefault();
        undo();
        return;
      }

      // Redo
      if (
        ((cmdOrCtrl && e.key === "z" && e.shiftKey) ||
          (cmdOrCtrl && e.key === "y")) &&
        canRedo
      ) {
        e.preventDefault();
        redo();
        return;
      }

      // input에 포커스 되어 있는 경우에는 키보드 shortcut X
      if (isInputFocused()) return;

      // 붙여넣기
      if (cmdOrCtrl && e.key === "v" && !e.shiftKey && clipboard) {
        e.preventDefault();
        const cloned = cloneNodeWithNewIds(clipboard);
        // 일반 복사 - 선택 노드 존재
        if (selectedNode) {
          insertNodeAfter(cloned, selectedNode.id); // 선택된 노드 뒤
        } else {
          // 잘라내기 - 선택 노드는 삭제되었으므로 루트에 추가
          insertIntoContainer("canvas-root", cloned);
        }

        // 붙여넣은 노드를 바로 선택
        setSelectedNode(cloned);
      }

      if (!selectedNode) return;

      // 복제
      if (cmdOrCtrl && e.key === "d" && !e.shiftKey) {
        e.preventDefault();
        duplicateNode(selectedNode.id);
        return;
      }

      // 복사
      if (cmdOrCtrl && e.key === "c" && !e.shiftKey) {
        e.preventDefault();
        setClipboard(selectedNode);
        return;
      }

      // 잘라내기
      if (cmdOrCtrl && e.key === "x" && !e.shiftKey) {
        e.preventDefault();
        setClipboard(selectedNode);
        removeNodeById(selectedNode.id);
        return;
      }

      /** Move Component Up and down (drag and drop 이동에 대한 키보드 액션을 통한 보완) */
      // arrow up
      if (cmdOrCtrl && e.key === "ArrowUp") {
        e.preventDefault();
        moveNodeUp(selectedNode.id);
        return;
      }

      // arrow down
      if (cmdOrCtrl && e.key === "ArrowDown") {
        e.preventDefault();
        moveNodeDown(selectedNode.id);
        return;
      }

      // delete
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removeNodeById(selectedNode.id);
        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    canRedo,
    canUndo,
    selectedNode,
    clipboard,
    undo,
    redo,
    duplicateNode,
    setSelectedNode,
    insertIntoContainer,
    insertNodeAfter,
    removeNodeById,
    moveNodeUp,
    moveNodeDown,
  ]);
}
