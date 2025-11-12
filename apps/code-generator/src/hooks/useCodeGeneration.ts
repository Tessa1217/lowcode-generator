import type { TreeNode } from "../types";
import { useState } from "react";

interface GenerationOptions {
  indent?: number;
  includeImports?: boolean;
  generateComponentName?: string;
}

export function useCodeGeneration(options: GenerationOptions) {
  const {
    indent = 2,
    includeImports = true,
    generateComponentName = "GeneratedComponent",
  } = options;

  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCode = (nodes: TreeNode[]) => {
    setIsGenerating(true);

    try {
      // 1. 사용된 컴포넌트 수집
      const usedComponents = collectAllUsedComponents(nodes);

      // 2. Import 문 생성
      const imports = includeImports ? generateImports(usedComponents) : "";

      // 3. 컴포넌트 본문 생성
      const body = nodes.map((node) => nodeToJSX(node, 0, indent)).join("\n\n");

      // 4. 전체 코드 조합
      const code = includeImports
        ? `${imports}\n\nexport default function ${generateComponentName}() {\n  return (\n    <>\n${indentCode(
            body,
            indent * 3
          )}\n    </>\n  );\n}\n`
        : body;

      setGeneratedCode(code);
      return code;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatedCode,
    isGenerating,
    generateCode,
  };
}

function nodeToJSX(node: TreeNode, depth: number, indentSize: number): string {
  const indent = " ".repeat(depth * indentSize);
  const componentName = node.componentName;

  if (componentName === "Text") {
    return `${indent}${node.props.children || ""}`;
  }

  const propsString = generatePropsString(node.props);

  if (node.children && node.children.length > 0) {
    const childrenJSX = node.children
      .map((child) => nodeToJSX(child, depth + 1, indentSize))
      .join("\n");
    return `${indent}<${componentName}${propsString}>\n${childrenJSX}\n${indent}</${componentName}>`;
  }

  if (node.props.children) {
    const childContent =
      typeof node.props.children === "string"
        ? node.props.children
        : JSON.stringify(node.props.children);

    return `${indent}<${componentName}${propsString}>${childContent}</${componentName}>`;
  }

  return `${indent}<${componentName}${propsString} />`;
}

/**
 * props 문자열 생성
 * @param props 컴포넌트 props
 * @param componentName 컴포넌트명
 * @returns props 문자열을 포함한 컴포넌트
 */
function generatePropsString(props: Record<string, unknown>): string {
  // children은 별도 처리
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...restProps } = props;

  const propEntries = Object.entries(restProps);

  if (propEntries.length === 0) {
    return "";
  }

  const propStrings = propEntries.map(([key, value]) => {
    // boolean true는 키만
    if (value === true) {
      return key;
    }

    // boolean false는 명시적으로
    if (value === false) {
      return `${key}={false}`;
    }

    // 문자열
    if (typeof value === "string") {
      return `${key}="${escapeString(value)}"`;
    }

    // 숫자
    if (typeof value === "number") {
      return `${key}={${value}}`;
    }

    // 객체/배열
    if (typeof value === "object") {
      return `${key}={${JSON.stringify(value)}}`;
    }

    // 기타
    return `${key}={${JSON.stringify(value)}}`;
  });

  return " " + propStrings.join(" ");
}

/**
 * 문자열 escape 처리
 * @param str escape 처리할 문자열
 * @returns escape 처리된 문자열
 */
function escapeString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

/**
 * 코드 indentation 처리
 * @param code 코드
 * @param spaces indent 공간
 * @returns indentation 처리된 코드
 */
function indentCode(code: string, spaces: number): string {
  const indent = " ".repeat(spaces);
  return code
    .split("\n")
    .map((line) => (line.trim() ? indent + line : line))
    .join("\n");
}

/**
 * 트리에서 사용된 모든 노드를 순회하며 컴포넌트 수집
 * @param nodes 트리 노드
 * @returns 트리 Set
 */
function collectAllUsedComponents(nodes: TreeNode[]): Set<string> {
  const components = new Set<string>();

  function traverse(node: TreeNode) {
    if (node.componentName !== "Text") {
      components.add(node.componentName);
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  nodes.forEach(traverse);
  return components;
}

/**
 * import 구문 생성
 * @param components 사용된 컴포넌트 Set
 * @returns 사용된 구문을 포함한 import 구문
 */
function generateImports(components: Set<string>): string {
  const componentList = Array.from(components).sort();

  if (componentList.length === 0) {
    return "";
  }

  return `import { ${componentList.join(", ")} } from '@packages/ui'`;
}
