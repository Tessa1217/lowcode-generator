import { DragAndDropContext } from "./components/drag-and-drop/drag-and-drop-context";
import { ComponentPalette } from "./components/component-palette/component-palette";
import { TabList } from "./components/layout/tab-list";
import { TabContent } from "./components/layout/tab-content";
import { useTabTransition } from "./hooks/useTabTransition";
import { appLayout, main, mainSection } from "./App.css";

function App() {
  const APP_TABS = ["Canvas", "Tree", "Code"];

  const { tabs, activeTab, changeTab } = useTabTransition(APP_TABS);

  return (
    <>
      <div className={appLayout}>
        <DragAndDropContext>
          <ComponentPalette />
          <main className={main}>
            <TabList tabs={tabs} activeTab={activeTab} changeTab={changeTab} />
            <section className={mainSection}>
              <TabContent activeTab={activeTab} />
            </section>
          </main>
        </DragAndDropContext>
      </div>
    </>
  );
}

export default App;
