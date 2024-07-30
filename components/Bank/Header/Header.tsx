import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faCreditCard,
  faLifeRing,
  faSearch,
  faBell,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/bank/index.module.css";

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
        bank
      </div>
      <nav className={styles.nav}>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faHome} /> Home
        </a>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faChartLine} /> Investments
        </a>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faCreditCard} /> Payments
        </a>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faNewspaper} /> News
        </a>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchBar}
          />
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </div>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faLifeRing} /> Lifestyle
        </a>
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
