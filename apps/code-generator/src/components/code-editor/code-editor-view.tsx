import { useTreeStore } from "../../store/treeStore";
import { CodeViewer } from "./code-viewer";
import {
  codeEditorView,
  codeEditorHeader,
  codeEditorContainer,
} from "./code-editor-view.css";

export function CodeEditorView() {
  const { tree } = useTreeStore();

  return (
    <div className={codeEditorView}>
      <h2 className={codeEditorHeader}>Generated Code</h2>
      <div className={codeEditorContainer}>
        <CodeViewer nodes={tree} height="100%" showMinimap={true} />
      </div>
    </div>
  );
}
