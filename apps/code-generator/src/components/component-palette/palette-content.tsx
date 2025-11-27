import { useState } from "react";
import {
  COMPONENT_CATEGORIES,
  getComponentsByCategory,
  type ComponentName,
} from "../../registry";
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

  const categories = Object.values(COMPONENT_CATEGORIES);

  return (
    <div className="palette-content">
      {categories.map((category) => {
        const components = getComponentsByCategory(category);
        const isOpen = openCategories[category];
        return (
          <div key={category} className="category" data-category={category}>
            <h4
              className={`category-title ${isOpen ? "open" : ""}`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </h4>
            <div className={`category-content ${isOpen ? "open" : ""}`}>
              <div className="component-grid">
                {components.map(({ name, component, meta }) => (
                  <DraggableComponentCard
                    key={name}
                    name={name}
                    component={component}
                    meta={meta}
                    isSelected={selectedComponent === name}
                    onClick={() => onClick(name)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
