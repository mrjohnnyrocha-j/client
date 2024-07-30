import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faArrowDown, faArrowUp, faSignOutAlt, faComments, faUserFriends, faBell, faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleUserMenuClick = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    // Add sign-out logic
    console.log('User signed out');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
      <Image src="/assets/j_logo.png" alt="j Logo" width={26} height={108} />
      </div>
      <nav className={styles.nav}>
        <a href="#" className={styles.navItem}><FontAwesomeIcon icon={faHome} /> Home</a>
        <a href="#" className={styles.navItem}><FontAwesomeIcon icon={faComments} /> Chats</a>
        <a href="#" className={styles.navItem}><FontAwesomeIcon icon={faUserFriends} /> Contacts</a>
        <a href="#" className={styles.navItem}><FontAwesomeIcon icon={faBell} /> Notifications</a>
        <a href="#" className={styles.navItem}><FontAwesomeIcon icon={faCog} /> Settings</a>
      </nav>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search chats..."
          onChange={handleSearchChange}
        />
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      </div>
      <div className={styles.userMenu} onClick={handleUserMenuClick}>
      <img src={session?.user?.image || '/path/to/profile-pic.jpg'} alt="Current User" className={styles.profilePic} />
        <span>{session?.user?.name}</span>
        <FontAwesomeIcon className={styles.icon} icon={userMenuOpen ? faArrowUp : faArrowDown} />
        {userMenuOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <li><FontAwesomeIcon className={styles.icon} icon={faCog} /> Settings</li>
              <li onClick={handleSignOut}><FontAwesomeIcon className={styles.icon} icon={faSignOutAlt} /> Sign Out</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
