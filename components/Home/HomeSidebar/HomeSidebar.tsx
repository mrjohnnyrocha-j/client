import React from 'react';
import styles from './HomeSidebar.module.css';

const HomeSidebar: React.FC = () => {
  return (
    <div className={styles.homeSidebar}>
      <h2>Profile Options</h2>
      <ul>
        <li>Personal Profile</li>
        <li>Professional Profile</li>
        <li>Customizable Profile</li>
      </ul>
    </div>
  );
};

export default HomeSidebar;
