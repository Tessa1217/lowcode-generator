import { CanvasView } from "../canvas/canvas-view";
import { TreeView } from "../tree/tree-view";
import { CodeEditorView } from "../code-editor/code-editor-view";

interface TabContentProps {
  activeTab: string | undefined;
}

export function TabContent({ activeTab }: TabContentProps) {
  switch (activeTab) {
    case "Canvas":
      return <CanvasView />;
    case "Tree":
      return <TreeView />;
    case "Code":
      return <CodeEditorView />;
    default:
      return null;
  }
}
