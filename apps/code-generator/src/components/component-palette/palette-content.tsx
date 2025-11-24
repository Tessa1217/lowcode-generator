import {
  ComponentRegistry,
  ComponentsByCategory,
  type ComponentName,
  type ComponentRegistryItem,
} from "@packages/ui";
import { useState } from "react";
import { DraggableComponentCard } from "../drag-and-drop/draggable-component-card";

interface PaletteContentProps {
  selectedComponent: ComponentName | null;
  onClick: (name: ComponentName) => void;
}

export function PaletteContent({
  selectedComponent,
  onClick,
}: PaletteContentProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="palette-content">
      {Object.entries(ComponentsByCategory).map(([category, components]) => (
        <div key={category} className="category" data-category={category}>
          <h4
            className={`category-title ${
              openCategories[category] ? "open" : ""
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </h4>
          <div
            className={`category-content ${
              openCategories[category] ? "open" : ""
            }`}
          >
            <div className="component-grid">
              {(components as ComponentName[])
                .filter(
                  (name) =>
                    !(ComponentRegistry[name] as ComponentRegistryItem)?.hidden
                )
                .map((name) => {
                  const item = ComponentRegistry[name];
                  const Component = item.component;
                  return (
                    <DraggableComponentCard
                      key={name}
                      componentName={name}
                      component={Component}
                      onClick={() => onClick(name)}
                      isSelected={selectedComponent === name}
                      meta={item.meta}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
