import React from 'react';
import { FaTasks, FaFolder, FaFile, FaBook, FaEllipsisH } from 'react-icons/fa';
import styles from './TaskNavigator.module.css';

interface TaskNavigatorProps {
  onSelectCategory: (category: string) => void;
}

const TaskNavigator: React.FC<TaskNavigatorProps> = ({ onSelectCategory }) => {
  return (
    <div className={styles.taskNavigator}>
      <ul>
        <li onClick={() => onSelectCategory('projects')}>
          <FaFolder /> <span className={styles.itemText}>Projects</span>
        </li>
        <li onClick={() => onSelectCategory('tasks')}>
          <FaTasks /> <span className={styles.itemText}>Tasks</span>
        </li>
        <li onClick={() => onSelectCategory('documentation')}>
          <FaBook /> <span className={styles.itemText}>Documentation</span>
        </li>
        <li onClick={() => onSelectCategory('files')}>
          <FaFile /> <span className={styles.itemText}>Files</span>
        </li>
        <li onClick={() => onSelectCategory('others')}>
          <FaEllipsisH /> <span className={styles.itemText}>Others</span>
        </li>
      </ul>
    </div>
  );
};

export default TaskNavigator;
