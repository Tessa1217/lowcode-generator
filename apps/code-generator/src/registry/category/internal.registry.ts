import { type PropsMeta } from "../types";

/**
 * 내부 전용 컴포넌트 Registry
 */
export const InternalComponentRegistry = {
  Text: {
    component: (props: { children: string }) => props.children,
    meta: {
      component: "Text",
      category: "Internal",
      description: "단순 텍스트 노드 (내부 전용)",
      hasChildren: false,
      props: {
        children: {
          control: "text",
          default: "",
          description: "표시할 문자열",
        },
      },
      scaffold: `<Text>텍스트</Text>`,
      renderPreview: (
        _Component: React.ElementType,
        props: Record<string, PropsMeta>
      ) => props.children,
    },
  },
} as const;
