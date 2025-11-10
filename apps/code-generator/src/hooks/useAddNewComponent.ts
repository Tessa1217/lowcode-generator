import { useState } from "react";
import { type ComponentName } from "@packages/ui";
import { useTreeStore } from "../store/treeStore";
import { createNode } from "../utils/treeHelper";

export function useAddNewComponent(defaultProps: Record<string, unknown>) {
  const [componentProps, setComponentProps] =
    useState<Record<string, unknown>>(defaultProps);

  const { insertIntoContainer } = useTreeStore();

  /**
   * 신규 컴포넌트를 설정된 props 정보와 함께 canvas의 루트 노드에 추가합니다.
   * @param componentName 컴포넌트명
   * @param props 전달할 props
   */
  const addNewComponent = (
    componentName: ComponentName,
    props: Record<string, unknown>
  ) => {
    const newNode = createNode(componentName, props);
    insertIntoContainer("canvas-root", newNode);
  };

  /**
   * 컴포넌트 Props을 변경합니다.
   * @param propName 속성명칭
   * @param value 변경할 값
   */
  const handleComponentPropsChange = (propName: string, value: unknown) => {
    setComponentProps({ ...componentProps, [propName]: value });
  };

  return {
    componentProps,
    setComponentProps,
    addNewComponent,
    handleComponentPropsChange,
  };
}
