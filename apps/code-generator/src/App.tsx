import { DragAndDropContext } from "./components/drag-and-drop/drag-and-drop-context";
import { ComponentPalette } from "./components/component-palette/component-palette";
import { TabList } from "./components/layout/tab-list";
import { TabContent } from "./components/layout/tab-content";
import { useTabTransition } from "./hooks/useTabTransition";
import * as styles from "./App.css";

function App() {
  const APP_TABS = ["Canvas", "Tree", "Code"];

  const { tabs, activeTab, changeTab, isPending } = useTabTransition(APP_TABS);

  return (
    <>
      <div className={styles.appLayout}>
        <DragAndDropContext>
          <ComponentPalette />
          <main className={styles.main}>
            <TabList tabs={tabs} activeTab={activeTab} changeTab={changeTab} />
            <section className={styles.mainSection}>
              <TabContent activeTab={activeTab} isPending={isPending} />
            </section>
          </main>
        </DragAndDropContext>
      </div>
    </>
  );
}

export default App;
