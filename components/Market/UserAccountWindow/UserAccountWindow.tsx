import React, { useState } from 'react';
import { FaUser, FaClipboardList, FaHistory, FaHeart, FaCog, FaSignOutAlt, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import AccountInfo from './AccountInfo/AccountInfo';
import Orders from './Orders/Orders';
import Recommendations from './Recommendations/Recommendations';
import BrowsingHistory from './BrowsingHistory/BrowsingHistory';
import Watchlists from './Watchlists/Watchlists';
import ManageProfiles from './ManageProfiles/ManageProfiles';
import styles from './UserAccountWindow.module.css';

const UserAccountWindow: React.FC = () => {
  const [activeSection, setActiveSection] = useState('accountInfo');
  const [menuOpen, setMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'accountInfo':
        return <AccountInfo />;
      case 'orders':
        return <Orders />;
      case 'recommendations':
        return <Recommendations />;
      case 'browsingHistory':
        return <BrowsingHistory />;
      case 'watchlists':
        return <Watchlists />;
      case 'manageProfiles':
        return <ManageProfiles />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <div className={styles.userAccountWindow}>
      <div className={styles.header} onClick={() => setMenuOpen(!menuOpen)}>
        <h2>User Account</h2>
        {menuOpen ? <FaArrowUp className={styles.icon}/> : <FaArrowDown className={styles.icon}/>}
      </div>
      {menuOpen && (
        <ul className={styles.navList}>
          <li onClick={() => setActiveSection('accountInfo')}><FaUser className={styles.icon}/> Account Info</li>
          <li onClick={() => setActiveSection('orders')}><FaClipboardList className={styles.icon}/> Orders</li>
          <li onClick={() => setActiveSection('recommendations')}><FaHeart className={styles.icon}/> Recommendations</li>
          <li onClick={() => setActiveSection('browsingHistory')}><FaHistory className={styles.icon}/> Browsing History</li>
          <li onClick={() => setActiveSection('watchlists')}><FaClipboardList className={styles.icon} /> Watchlists</li>
          <li onClick={() => setActiveSection('manageProfiles')}><FaCog className={styles.icon}/> Manage Profiles</li>
          <li><FaSignOutAlt className={styles.icon} /> Sign Out</li>
        </ul>
      )}
      <div className={styles.sectionContent}>
        {renderSection()}
      </div>
    </div>
  );
};

export default UserAccountWindow;
