import { useState } from "react";
import { type ComponentName } from "../../registry";
import { PropertyCanvasEditor } from "../property/property-canvas-editor";
import { TemplateContent } from "./template-content";
import { PaletteContent } from "./palette-content";
import { PaletteTabs } from "./palette-tabs";
import { palette, sidebar, sidebarHeader } from "./component-palette.css";
// import "./component-palette-old.css";

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
    <section className={sidebar}>
      <div className={sidebarHeader}>
        <h2>Component Palette</h2>
      </div>
      <PaletteTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={palette}>
        {activeTab === "components" && (
          <PaletteContent
            selectedComponent={selectedComponent}
            onClick={handleComponentClick}
          />
        )}
        {activeTab === "templates" && <TemplateContent />}
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
