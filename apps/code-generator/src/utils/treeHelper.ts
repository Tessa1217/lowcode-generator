import type { TreeNode } from "../types";
import { nanoid } from "nanoid";
import { getComponentMeta, type ComponentName } from "../registry";
import { parseScaffoldToTree } from "./parseScaffoldToTree";

/**
 * 신규 노드를 생성합니다.
 * @param componentName 컴포넌트명
 * @param props 컴포넌트 props
 * @returns 새로 생성된 신규 노드
 */
export function createNode(
  componentName: ComponentName,
  props: Record<string, unknown> = {}
): TreeNode {
  const meta = getComponentMeta(componentName);

  if (meta?.scaffold) {
    const parsedNode: TreeNode | null = parseScaffoldToTree(meta.scaffold);

    if (parsedNode) {
      return {
        ...parsedNode,
        props: { ...parsedNode?.props, ...props },
      };
    }
  }

  return {
    id: nanoid(),
    componentName,
    props,
    meta,
    children: [],
  };
}

/**
 * 주어진 조건에 맞는 노드 찾기
 * @param nodes 노드 트리
 * @param predicate 찾는 조건
 * @returns 조건에 맞는 노드
 */
export function findNode(
  nodes: TreeNode[],
  predicate: (node: TreeNode) => boolean
): TreeNode | null {
  for (const node of nodes) {
    if (predicate(node)) return node;
    if (node.children) {
      const found = findNode(node.children, predicate);
      if (found) return found;
    }
  }
  return null;
}

/**
 * 노드의 부모 찾기
 * @param nodes 노드 트리
 * @param targetId 타겟 아이디
 * @returns 노드
 */
export function findParentNode(
  nodes: TreeNode[],
  targetId: string
): TreeNode | null {
  return findNode(nodes, (node) =>
    node.children?.some((child) => child.id === targetId)
  );
}

export function findNodeIndex(nodes: TreeNode[], nodeId: string): number {
  return nodes.findIndex((n) => n.id === nodeId);
}

/**
 * 노드 복제
 * 하위 자식들까지 전체 새로 생성된 아이디를 가진 채로 복제
 * @param node 노드
 * @returns 복제 노드
 */
export function cloneNodeWithNewIds(node: TreeNode): TreeNode {
  return {
    ...node,
    id: nanoid(),
    children: node.children.map((child) => cloneNodeWithNewIds(child)),
  };
}

/**
 * 노드 깊은 복사
 * 아이디는 유지한 채 노드 내부 속성들을 깊은 복사
 * @param node 노드
 * @returns 깊은 복사된 노드
 */
export function cloneNode(node: TreeNode): TreeNode {
  return {
    ...node,
    children: node.children.map((child) => cloneNode(child)),
  };
}

/**
 * 노드의 props 수정
 * @param node props 수정할 노드
 * @param props 수정할 props
 * @returns props가 수정된 노드
 */
export function updateProps(
  node: TreeNode,
  props: Record<string, unknown>
): TreeNode {
  return {
    ...node,
    props: {
      ...node.props,
      ...props,
    },
  };
}

/**
 * 노드 아이디를 가지 노드 삭제
 * @param nodes 노드 트리
 * @param nodeId 노드 아이디
 * @returns 노드를 삭제한 트리
 */
export function removeNode(
  nodes: TreeNode[],
  nodeId: string
): [TreeNode[], TreeNode | null] {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!node) return [nodes, null];

    if (node.id === nodeId) {
      const newNodes = [...nodes];
      newNodes.splice(i, 1);
      return [newNodes, node];
    }

    if (node.children) {
      const [newChildren, removed] = removeNode(node.children, nodeId);
      if (removed) {
        const newNodes = [...nodes];
        newNodes[i] = { ...node, children: newChildren };
        return [newNodes, removed];
      }
    }
  }
  return [nodes, null];
}

export function appendNode(
  nodes: TreeNode[],
  targetId: string,
  newNode: TreeNode
): TreeNode[] | null {
  const targetIndex = findNodeIndex(nodes, targetId);

  if (targetIndex !== -1) {
    const newNodes = [...nodes];
    newNodes.splice(targetIndex + 1, 0, newNode);
    return newNodes;
  }

  for (const node of nodes) {
    if (node.children) {
      const newChildren = appendNode(node.children, targetId, newNode);
      if (newChildren) {
        return nodes.map((n) =>
          n.id === node.id ? { ...n, children: newChildren } : n
        );
      }
    }
  }
  return null;
}

export function prependNode(
  nodes: TreeNode[],
  targetId: string,
  newNode: TreeNode
): TreeNode[] | null {
  const targetIndex = findNodeIndex(nodes, targetId);

  if (targetIndex !== -1) {
    const newNodes = [...nodes];
    newNodes.splice(targetIndex, 0, newNode);
    return newNodes;
  }

  for (const node of nodes) {
    if (node.children) {
      const newChildren = prependNode(node.children, targetId, newNode);
      if (newChildren) {
        return nodes.map((n) =>
          n.id === node.id ? { ...n, children: newChildren } : n
        );
      }
    }
  }
  return null;
}

export function insertNodeIntoContainer(
  nodes: TreeNode[],
  containerId: string,
  newNode: TreeNode
): TreeNode[] {
  return nodes.map((node) => {
    if (node.id === containerId && node.children !== undefined) {
      return {
        ...node,
        children: [...node.children, newNode],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: insertNodeIntoContainer(node.children, containerId, newNode),
      };
    }
    return node;
  });
}

export function replaceNode(
  nodes: TreeNode[],
  nodeId: string,
  newNode: TreeNode
): TreeNode[] {
  return nodes.map((node) => {
    if (node.id === nodeId) return newNode;
    if (node.children) {
      return {
        ...node,
        children: replaceNode(node.children, nodeId, newNode),
      };
    }
    return node;
  });
}

export function moveNodeUp(
  nodes: TreeNode[],
  nodeId: string
): TreeNode[] | null {
  const targetIndex = findNodeIndex(nodes, nodeId);

  // 이미 첫 번째면 이동 불가
  if (targetIndex <= 0) return null;

  // 위치 교환
  const newNodes = [...nodes];

  [newNodes[targetIndex - 1], newNodes[targetIndex]] = [
    newNodes[targetIndex],
    newNodes[targetIndex - 1],
  ];

  return newNodes;
}

export function moveNodeDown(
  nodes: TreeNode[],
  nodeId: string
): TreeNode[] | null {
  const targetIndex = findNodeIndex(nodes, nodeId);

  // 이미 마지막이면 이동 불가
  if (targetIndex === -1 || targetIndex >= nodes.length - 1) return null;

  // 위치 교환
  const newNodes = [...nodes];
  [newNodes[targetIndex], newNodes[targetIndex + 1]] = [
    newNodes[targetIndex + 1],
    newNodes[targetIndex],
  ];

  return newNodes;
}

export function moveNodeUpRecursive(
  nodes: TreeNode[],
  nodeId: string
): TreeNode[] {
  // 현재 레벨에서 이동 시도
  const moved = moveNodeUp(nodes, nodeId);
  if (moved) return moved;

  // 자식에서 재귀적으로 시도
  return nodes.map((node) => {
    if (node.children) {
      const newChildren = moveNodeUpRecursive(node.children, nodeId);
      if (newChildren !== node.children) {
        return { ...node, children: newChildren };
      }
    }
    return node;
  });
}

export function moveNodeDownRecursive(
  nodes: TreeNode[],
  nodeId: string
): TreeNode[] {
  // 현재 레벨에서 이동 시도
  const moved = moveNodeDown(nodes, nodeId);
  if (moved) return moved;

  // 자식에서 재귀적으로 시도
  return nodes.map((node) => {
    if (node.children) {
      const newChildren = moveNodeDownRecursive(node.children, nodeId);
      if (newChildren !== node.children) {
        return { ...node, children: newChildren };
      }
    }
    return node;
  });
}

export function countNodes(nodes: TreeNode[]): number {
  return nodes.reduce((count, node) => {
    return count + 1 + (node.children ? countNodes(node.children) : 0);
  }, 0);
}

export function getTreeDepth(nodes: TreeNode[]): number {
  if (nodes.length === 0) return 0;

  return Math.max(
    ...nodes.map((node) => {
      if (node.children && node.children.length > 0) {
        return 1 + getTreeDepth(node.children);
      }
      return 1;
    })
  );
}

export function getNodePath(
  nodes: TreeNode[],
  targetId: string,
  currentPath: TreeNode[] = []
): TreeNode[] | null {
  for (const node of nodes) {
    const newPath = [...currentPath, node];

    if (node.id === targetId) {
      return newPath;
    }

    if (node.children) {
      const found = getNodePath(node.children, targetId, newPath);
      if (found) return found;
    }
  }
  return null;
}

/**
 * 노드 아이디로 특정 노드 찾기
 * @param nodes 노드 트리
 * @param id 찾을 노드 아이디
 * @returns 노드
 */
export function findNodeById(nodes: TreeNode[], id: string): TreeNode | null {
  return findNode(nodes, (node) => node.id === id);
}
