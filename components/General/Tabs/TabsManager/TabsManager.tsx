import React from 'react';
import styles from './TabsManager.module.css';

interface TabsManagerProps {
  tabs: { url: string, title: string }[];
  onTabClick: (url: string) => void;
}

const TabsManager: React.FC<TabsManagerProps> = ({ tabs, onTabClick }) => {
  return (
    <div className={styles.tabsManager}>
      <h3>Recent Tabs</h3>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <div key={index} className={styles.tab} onClick={() => onTabClick(tab.url)}>
            {tab.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsManager;
