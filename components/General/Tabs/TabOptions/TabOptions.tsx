import React, { useState } from 'react';
import styles from './TabOptions.module.css';

const TabOptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Personal');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.tabOptions}>
      {['Personal', 'Professional', 'Other'].map((tab) => (
        <div
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabOptions;
