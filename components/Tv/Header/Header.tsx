import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faBell,
  faFilm,
  faList,
  faNewspaper,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";

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
    console.log("User signed out");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        <Image src="/assets/j_logo.png" alt="j Logo" width={26} height={108} />
        tv
      </div>
      <nav className={styles.nav}>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faHome} /> Home
        </a>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faTv} /> TV Shows
        </a>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faFilm} /> Movies
        </a>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faNewspaper} /> News
        </a>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faList} /> Lists
        </a>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchBar}
          />
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </div>
        <FontAwesomeIcon icon={faBell} className={styles.bellIcon} />
        <img
          src={session?.user?.image || "/path/to/profile-pic.jpg"}
          alt="Current User"
          className={styles.profilePic}
        />
      </nav>
    </header>
  );
};

export default Header;
