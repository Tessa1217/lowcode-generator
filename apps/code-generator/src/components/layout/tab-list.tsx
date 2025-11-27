import { mainTabs, tabWrapper, tab } from "./tab.css";

interface TabListProps {
  tabs: string[];
  activeTab: string | undefined;
  changeTab: (nextTab: string) => void;
}

export function TabList({ tabs, activeTab, changeTab }: TabListProps) {
  return (
    <header className={mainTabs}>
      <nav className={tabWrapper}>
        {tabs.map((t) => (
          <button
            key={t}
            className={tab({ isActive: activeTab === t })}
            onClick={() => changeTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>
    </header>
  );
}
