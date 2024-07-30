import React from 'react';
import Link from 'next/link';
import { FaTable, FaFileAlt, FaClipboardList, FaBoxOpen, FaCogs, FaRoute } from 'react-icons/fa';
import styles from './IndustrySideBar.module.css';

const IndustrySideBar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/industry/criteria-maintenance" legacyBehavior>
            <a><FaTable /></a>
          </Link>
        </li>
        <li>
          <Link href="/industry/record-generation" legacyBehavior>
            <a><FaFileAlt /></a>
          </Link>
        </li>
        <li>
          <Link href="/industry/path-records" legacyBehavior>
            <a><FaRoute /></a>
          </Link>
        </li>
        <li>
          <Link href="/industry/aggregation" legacyBehavior>
            <a><FaClipboardList /></a>
          </Link>
        </li>
        <li>
          <Link href="/industry/replanning" legacyBehavior>
            <a><FaBoxOpen /></a>
          </Link>
        </li>
        <li>
          <Link href="/industry/optimization" legacyBehavior>
            <a><FaCogs /></a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default IndustrySideBar;
