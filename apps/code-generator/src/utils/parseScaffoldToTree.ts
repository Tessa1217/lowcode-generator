import * as acorn from "acorn";
import jsx from "acorn-jsx";
import type { TreeNode } from "../types";
import type { ComponentName } from "@packages/ui";

// JSX 확장된 파서 생성
const Parser = acorn.Parser.extend(jsx());

/**
 * meta에서 scaffold를 제공하는 경우 JSX를 AST로 파싱하여 TreeNode[]로 변환
 * ex) <Thead><Tr><Th>제목</Th></Tr></Thead>
 */
export function parseScaffoldToTree(scaffold: string): TreeNode | null {
  const ast = Parser.parse(scaffold, {
    ecmaVersion: "latest",
    sourceType: "module",
  });

  function walkJSX(node: any): TreeNode {
    const name = node.openingElement.name.name as ComponentName;

    // JSX 속성 파싱
    const props: Record<string, any> = {};
    for (const attr of node.openingElement.attributes || []) {
      const key = attr.name?.name;
      if (!key) continue;
      if (attr.value?.value !== undefined) {
        props[key] = attr.value.value;
      } else if (attr.value?.expression) {
        props[key] = attr.value.expression.name ?? null;
      }
    }

    const children: TreeNode[] = [];

    // 자식 노드 재귀 순회
    for (const child of node.children || []) {
      if (child.type === "JSXElement") {
        children.push(walkJSX(child));
      } else if (child.type === "JSXText" && child.value.trim()) {
        children.push({
          id: `node-${crypto.randomUUID()}`,
          componentName: "Text",
          props: { children: child.value.trim() },
          children: [],
        });
      }
    }

    return {
      id: `node-${crypto.randomUUID()}`,
      componentName: name,
      props,
      children,
    };
  }

  const topLevel = ast.body.find(
    (node: any) =>
      (node.type === "ExpressionStatement" &&
        node.expression.type === "JSXElement") ||
      node.type === "JSXElement"
  );

  if (!topLevel) return null;

  const rootNode =
    topLevel.type === "ExpressionStatement"
      ? walkJSX(topLevel.expression)
      : walkJSX(topLevel);

  return rootNode;
}
