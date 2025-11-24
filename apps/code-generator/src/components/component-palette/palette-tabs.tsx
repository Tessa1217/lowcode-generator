import { type PaletteTab } from "./component-palette";

interface PaletteTabsProps {
  activeTab: PaletteTab;
  setActiveTab: (tab: PaletteTab) => void;
}
export function PaletteTabs({ activeTab, setActiveTab }: PaletteTabsProps) {
  return (
    <div className="palette-tabs">
      <button
        className={`palette-tab ${activeTab === "components" ? "active" : ""}`}
        onClick={() => setActiveTab("components")}
      >
        <span className="tab-icon">📦</span>
        <span>Components</span>
      </button>
      <button
        className={`palette-tab ${activeTab === "templates" ? "active" : ""}`}
        onClick={() => setActiveTab("templates")}
      >
        <span className="tab-icon">✨</span>
        <span>Templates</span>
      </button>
    </div>
  );
}
