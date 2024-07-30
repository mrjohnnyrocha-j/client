import React from 'react';
import styles from './FinalMenu.module.css';

const FinalMenu: React.FC = () => {
  return (
    <div className={styles.finalMenu}>
      <h2>Final Menu</h2>
      <div className={styles.confirmation}>
        <p>Confirm?</p>
        <button>Yes</button>
        <button>No, go back</button>
      </div>
      <div className={styles.changedResources}>
        <h3>Changed Resources</h3>
        <ul>
          <li>Iso 1</li>
          <li>Iso 2</li>
          <li>Iso 3</li>
        </ul>
      </div>
      <div className={styles.plans}>
        <h3>Plans for Selected Resource</h3>
        <p>Plan details...</p>
        <p>Plan details...</p>
        <div className={styles.filters}>
          <label>
            <input type="checkbox" />
            Resource
          </label>
          <label>
            <input type="checkbox" />
            Item
          </label>
        </div>
      </div>
    </div>
  );
};

export default FinalMenu;
