import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type ComponentName } from "@packages/ui";
import { type TreeNode } from "../types";
import {
  insertNodeIntoContainer,
  createNode,
  removeNode,
  appendNode,
  updateProps,
  findNodeById,
  prependNode,
  moveNodeUpRecursive,
  moveNodeDownRecursive,
  cloneNodeWithNewIds,
} from "../utils/treeHelper";
import { useHistoryStore } from "./historyStore";

interface TreeStore {
  tree: TreeNode[];
  hoveredNodeId: string | null;
  selectedNode: TreeNode | null;

  setHoveredNode: (id: string | null) => void;
  setSelectedNode: (node: TreeNode | null) => void;
  setTree: (tree: TreeNode[], addToHistory?: boolean) => void;
  insertIntoContainer: (targetId: string, newNode: TreeNode) => void;
  removeNodeById: (id: string) => [TreeNode[], TreeNode | null];
  insertNodeAfter: (nodeToInsert: TreeNode, targetId: string) => void;
  insertNodeBefore: (nodeToInsert: TreeNode, targetId: string) => void;
  updateNodeById: (nodeId: string, updateNode: TreeNode) => void;
  updateNodeProps: (nodeId: string, props: Record<string, unknown>) => void;

  // keyboard action 등을 활용해 drag and drop 컴포넌트 이동을 용이하게 하기 위한 추가 action
  duplicateNode: (nodeId: string) => void;
  moveNodeUp: (nodeId: string) => void;
  moveNodeDown: (nodeId: string) => void;
  wrapNode: (nodeId: string, containerType: ComponentName) => void;

  reset: () => void;
}

export const useTreeStore = create<TreeStore>()(
  devtools((set, get) => ({
    tree: [],
    hoveredNodeId: null,
    selectedNode: null,

    setHoveredNode: (id) => {
      if (!id) return;
      set({ hoveredNodeId: id });
    },
    setSelectedNode: (node) => {
      if (!node?.id) return;
      set({ selectedNode: node });
    },

    setTree: (tree, addToHistory = true) => {
      set({ tree });
      // history 추가 시
      if (addToHistory) {
        useHistoryStore.getState().addToHistory(tree);
      } else {
        // history 추가 아닌 경우에는 동기화
        useHistoryStore.getState().syncPresent(tree);
      }
    },
    /**
     * 노드를 특정 컨테이너 내부로 삽입
     * @param targetId
     * @param newNode
     * @returns 트리 노드 배열
     */
    insertIntoContainer: (targetId, newNode) => {
      const { tree } = get();

      if (targetId === "canvas-root") {
        get().setTree([...tree, newNode], true);
        return;
      }

      const updated = insertNodeIntoContainer(tree, targetId, newNode);
      get().setTree(updated, true);
    },

    /**
     * 재귀적으로 노드를 탐색하여 트리에서 특정 노드를 제거
     * @returns [수정된 트리, 제거된 노드]
     */
    removeNodeById: (id: string) => {
      const { tree } = get();
      const [updated, removedNode] = removeNode(tree, id);
      if (id === get().selectedNode?.id) {
        set({ selectedNode: null });
      }
      get().setTree(updated, true);
      return [updated, removedNode];
    },
    /**
     * 재귀적으로 노드를 탐색하여 노드에 새 노드를 삽입
     * direction이 after인 경우는 노드 뒤에 삽입
     */
    insertNodeAfter: (nodeToInsert: TreeNode, targetId: string) => {
      const { tree } = get();
      const updated = appendNode(tree, targetId, nodeToInsert);
      if (updated) get().setTree(updated, true);
    },
    /**
     * 재귀적으로 노드를 탐색하여 노드에 새 노드를 삽입
     * direction이 before인 경우는 노드 앞에 삽입
     */
    insertNodeBefore: (nodeToInsert: TreeNode, targetId: string) => {
      const { tree } = get();
      const updated = prependNode(tree, targetId, nodeToInsert);
      if (updated) get().setTree(updated, true);
    },
    /**
     * 노드 아이디 기준으로 찾은 특정 노드를 수정
     * @param nodeId 수정할 노드 아이디
     * @param updatedNode 수정될 노드 정보
     */
    updateNodeById: (nodeId, updatedNode) => {
      const { tree } = get();

      function update(nodes: TreeNode[]): TreeNode[] {
        return nodes.map((n) => {
          if (n.id === nodeId) return updatedNode;
          if (n.children && n.children.length > 0) {
            return { ...n, children: update(n.children) };
          }
          return n;
        });
      }

      const updatedTree = update(tree);
      get().setTree(updatedTree, true);
    },
    /**
     * 특정 노드의 props만 업데이트
     * @param nodeId 업데이트할 노드 아이디
     * @param props 업데이트할 props 객체
     */
    updateNodeProps: (nodeId, props) => {
      const { tree, selectedNode } = get();

      function traverse(nodes: TreeNode[]): TreeNode[] {
        return nodes.map((node) => {
          if (node.id === nodeId) {
            const updatedNode = updateProps(node, props);

            // 선택된 노드도 함께 업데이트
            if (selectedNode?.id === nodeId) {
              set({ selectedNode: updatedNode });
            }

            return updatedNode;
          }

          if (node.children && node.children.length > 0) {
            return { ...node, children: traverse(node.children) };
          }

          return node;
        });
      }

      const updatedTree = traverse(tree);
      get().setTree(updatedTree, true);
    },
    /**
     * 노드를 복제하여 복제 대상이 된 노드 뒤에 삽입
     * @param nodeId 복제할 노드 아이디
     */
    duplicateNode: (nodeId: string) => {
      const { tree } = get();

      const nodeToDuplicate = findNodeById(tree, nodeId);
      if (!nodeToDuplicate) return;

      const duplicated = cloneNodeWithNewIds(nodeToDuplicate);

      const updated = appendNode(tree, nodeId, duplicated);
      if (updated) {
        get().setTree(updated, true);
        set({ selectedNode: duplicated });
      }
    },
    /**
     * 노드를 상위로 이동
     * @param nodeId 이동할 노드 아이디
     */
    moveNodeUp: (nodeId: string) => {
      const { tree } = get();
      const updated = moveNodeUpRecursive(tree, nodeId);

      if (updated !== tree) {
        get().setTree(updated, true);
      }
    },
    /**
     * 노드를 하위로 이동
     * @param nodeId 이동할 노드 아이디
     */
    moveNodeDown: (nodeId: string) => {
      const { tree } = get();
      const updated = moveNodeDownRecursive(tree, nodeId);

      if (updated !== tree) {
        get().setTree(updated, true);
      }
    },
    /**
     * 노드를 컨테이너로 감싸기
     * @param nodeId 감쌀 노드 ID
     * @param containerType 컨테이너 타입
     */
    wrapNode: (nodeId: string, containerType: ComponentName) => {
      const { tree } = get();

      const nodeToWrap = findNodeById(tree, nodeId);
      if (!nodeToWrap) return;

      // 컨테이너 타입에 맞춰 wrapping할 컨테이너 노드 생성
      const container = createNode(containerType);

      container.children = [nodeToWrap];

      function wrapInTree(nodes: TreeNode[]): TreeNode[] | null {
        const targetIndex = nodes.findIndex((n) => n.id === nodeId);

        if (targetIndex !== -1) {
          const newNodes = [...nodes];
          newNodes[targetIndex] = container;
          return newNodes;
        }

        for (const node of nodes) {
          if (node.children) {
            const newChildren = wrapInTree(node.children);
            if (newChildren) {
              return nodes.map((n) =>
                n.id === node.id ? { ...n, children: newChildren } : n
              );
            }
          }
        }

        return null;
      }

      const updated = wrapInTree(tree);
      if (updated) {
        get().setTree(updated, true);
        // 컨테이너를 선택
        set({ selectedNode: container });
      }
    },
    /**
     * 노드 트리 초기화
     */
    reset: () => {
      get().setTree([]);
      useHistoryStore.getState().reset();
    },
  }))
);

// History 쪽과 동기화를 위해 구독
useHistoryStore.subscribe((state) => {
  const currentTree = useTreeStore.getState().tree;

  // present가 변경되었고, 현재 tree와 다르면 동기화
  if (state.present !== currentTree) {
    useTreeStore.setState({ tree: state.present });

    const selectedNode = useTreeStore.getState().selectedNode;
    if (selectedNode) {
      const updatedSelectedNode = findNodeById(state.present, selectedNode.id);
      if (updatedSelectedNode) {
        useTreeStore.setState({ selectedNode: updatedSelectedNode });
      } else {
        useTreeStore.setState({ selectedNode: null });
      }
    }
  }
});
