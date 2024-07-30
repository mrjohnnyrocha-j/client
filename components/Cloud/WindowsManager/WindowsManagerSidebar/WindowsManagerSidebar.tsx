import React from 'react';
import styles from './WindowsManagerSidebar.module.css';

interface SidebarProps {
  directories: string[];
  onSelectDirectory: (directory: string) => void;
}

const WindowsManagerSidebar: React.FC<SidebarProps> = ({ directories, onSelectDirectory }) => {
  return (
    <div className={styles.windowsManagerSidebar}>
      <h2 className={styles.header}>Directories</h2>
      <ul className={styles.directoryList}>
        {directories.map((directory, index) => (
          <li key={index} className={styles.directoryItem} onClick={() => onSelectDirectory(directory)}>
            {directory}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WindowsManagerSidebar;
