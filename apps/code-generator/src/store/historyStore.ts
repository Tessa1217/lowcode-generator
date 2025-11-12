import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type TreeNode } from "../types";

interface HistoryState {
  past: TreeNode[][];
  present: TreeNode[];
  future: TreeNode[][];
}

interface HistoryStore extends HistoryState {
  canUndo: boolean;
  canRedo: boolean;

  // Actions
  addToHistory: (newTree: TreeNode[]) => void;
  undo: () => TreeNode[];
  redo: () => TreeNode[];
  reset: () => void;

  // Internal (동기화용)
  syncPresent: (tree: TreeNode[]) => void;
}

const MAX_HISTORY = 50;

export const useHistoryStore = create<HistoryStore>()(
  devtools((set, get) => ({
    past: [],
    present: [],
    future: [],
    canUndo: false,
    canRedo: false,

    /**
     * 새로운 tree를 history에 추가
     * 이전 present를 past로 이동하고, 새 tree를 present로 설정
     */
    addToHistory: (newTree) => {
      const { present, past } = get();

      // 현재 present를 past에 추가
      const newPast = [...past, present].slice(-MAX_HISTORY);

      set({
        past: newPast,
        present: newTree,
        future: [], // 새 액션 시 future 클리어
        canUndo: true,
        canRedo: false,
      });
    },

    /**
     * Undo - 이전 상태로 되돌리기
     * @returns 복원할 tree
     */
    undo: () => {
      const { past, present, future } = get();

      if (past.length === 0) return present;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, -1);

      set({
        past: newPast,
        present: previous,
        future: [present, ...future],
        canUndo: newPast.length > 0,
        canRedo: true,
      });

      return previous;
    },

    /**
     * Redo - 다시 실행
     * @returns 복원할 tree
     */
    redo: () => {
      const { past, present, future } = get();

      if (future.length === 0) return present;

      const next = future[0];
      const newFuture = future.slice(1);

      set({
        past: [...past, present],
        present: next,
        future: newFuture,
        canUndo: true,
        canRedo: newFuture.length > 0,
      });

      return next;
    },

    /**
     * History 초기화
     */
    reset: () => {
      set({
        past: [],
        present: [],
        future: [],
        canUndo: false,
        canRedo: false,
      });
    },

    /**
     * Present만 동기화 (undo/redo 시 사용)
     */
    syncPresent: (tree) => {
      set({ present: tree });
    },
  }))
);
