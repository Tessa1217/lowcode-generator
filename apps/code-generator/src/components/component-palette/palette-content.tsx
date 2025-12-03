import { useState } from "react";
import {
  COMPONENT_CATEGORIES,
  getComponentsByCategory,
  type ComponentName,
} from "../../registry";
import { DraggableComponentCard } from "../drag-and-drop/draggable-component-card";
import { PaletteCategory } from "./palette-category";
import { paletteContent, componentGrid } from "./component-palette.css";

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
    <div className={paletteContent}>
      {categories.map((category) => {
        const components = getComponentsByCategory(category);
        const isOpen = openCategories[category] || false;
        return (
          <PaletteCategory
            key={category}
            category={category}
            isOpen={isOpen}
            toggleCategory={toggleCategory}
          >
            <div className={componentGrid({ mode: "component" })}>
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
          </PaletteCategory>
        );
      })}
    </div>
  );
}
