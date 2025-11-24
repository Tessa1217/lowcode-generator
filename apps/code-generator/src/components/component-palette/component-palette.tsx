import { type ComponentName } from "@packages/ui";
import { useState } from "react";
import { PropertyCanvasEditor } from "../property/property-canvas-editor";
import { TemplatePalette } from "./template-palette";
import { PaletteContent } from "./palette-content";
import { PaletteTabs } from "./palette-tabs";
import "./component-palette.css";

export type PaletteTab = "components" | "templates";

export function ComponentPalette() {
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentName | null>(null);

  const [activeTab, setActiveTab] = useState<PaletteTab>("components");

  const handleComponentClick = (name: ComponentName) => {
    setSelectedComponent(name);
  };

  const handleCloseDetail = () => {
    setSelectedComponent(null);
  };

  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <h2>Component Palette</h2>
      </div>
      <PaletteTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="palette">
        {activeTab === "components" && (
          <PaletteContent
            selectedComponent={selectedComponent}
            onClick={handleComponentClick}
          />
        )}
        {activeTab === "templates" && <TemplatePalette />}
      </div>
      {selectedComponent && (
        <PropertyCanvasEditor
          componentName={selectedComponent}
          onClose={handleCloseDetail}
        />
      )}
    </section>
  );
}
