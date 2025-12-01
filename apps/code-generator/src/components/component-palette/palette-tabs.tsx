import { type PaletteTab } from "./component-palette";
import { paletteTabs, paletteTab } from "./component-palette.css";

interface PaletteTabsProps {
  activeTab: PaletteTab;
  setActiveTab: (tab: PaletteTab) => void;
}
export function PaletteTabs({ activeTab, setActiveTab }: PaletteTabsProps) {
  return (
    <div className={paletteTabs}>
      <button
        className={paletteTab({ active: activeTab === "components" })}
        onClick={() => setActiveTab("components")}
      >
        <span className="tab-icon">📦</span>
        <span>Components</span>
      </button>
      <button
        className={paletteTab({ active: activeTab === "templates" })}
        onClick={() => setActiveTab("templates")}
      >
        <span className="tab-icon">✨</span>
        <span>Templates</span>
      </button>
    </div>
  );
}
