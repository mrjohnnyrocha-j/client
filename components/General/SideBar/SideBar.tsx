// SideBar.tsx
import React from 'react';
import UpperSideBar from './UpperSideBar/UpperSideBar';
import LowerSideBar from './LowerSideBar/LowerSideBar';
import styles from './SideBar.module.css';

interface SideBarProps {
  onSelectTab: (tab: string) => void;
  activeTabs: string[];
}

const SideBar: React.FC<SideBarProps> = ({ onSelectTab, activeTabs }) => {
  return (
    <div className={styles.sidebar}>
      <UpperSideBar onSelectTab={onSelectTab} activeTabs={activeTabs} />
      <LowerSideBar onSelectTab={onSelectTab} activeTabs={activeTabs} />
    </div>
  );
};

export default SideBar;
