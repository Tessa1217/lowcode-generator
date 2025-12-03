import { useState } from "react";
import { ReactFlow, type Node } from "@xyflow/react";
import { useTreeFlow } from "../../hooks/useTreeFlow";
import { useToggle } from "../../hooks/useToggle";
import { CustomEdge } from "./component-edge";
import { ComponentNode } from "./component-node";
import { ComponentInspector } from "./component-inspector";
import "@xyflow/react/dist/style.css";
import {
  treeViewWrapper,
  componentTreeFlow,
  componentInspectorCloseButton,
  componentInspector,
} from "./tree-view.css";

const edgeTypes = {
  "component-edge": CustomEdge,
};

const nodeTypes = {
  "component-node": ComponentNode,
};

export function TreeView() {
  const { nodes, edges } = useTreeFlow();
  const { on, toggle } = useToggle(false);
  const [selectedComponent, setSelectedComponent] = useState<Node | null>(null);

  return (
    <div className={treeViewWrapper}>
      <div className={componentTreeFlow}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={(_, node) => setSelectedComponent(node)}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          fitView
        />
      </div>
      <div className={componentInspector({ hidden: on })}>
        <button className={componentInspectorCloseButton} onClick={toggle}>
          {on ? "열기" : "닫기"}
        </button>
        {!on && <ComponentInspector node={selectedComponent} />}
      </div>
    </div>
  );
}
