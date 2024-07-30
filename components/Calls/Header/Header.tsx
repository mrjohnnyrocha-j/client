import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faArrowDown, faArrowUp, faInfoCircle, faHistory, faSignOutAlt, faBoxOpen, faStar, faUserEdit, faHome, faPhone, faVideo, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { cart } = useCart();
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleUserMenuClick = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    // Handle sign-out logic here
    console.log("User signed out");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/assets/j_logo.png" alt="j Logo" width={26} height={108} />
      </div>
      <nav className={styles.nav}>
        <a href="#" className={styles.navItem}><FontAwesomeIcon icon={faHome} /> Home</a>
        <a href="#" className={styles.navItem}><FontAwesomeIcon icon={faPhone} /> Calls</a>
        <a href="#" className={styles.navItem}><FontAwesomeIcon icon={faVideo} /> Videos</a>
      </nav>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search items..."
          onChange={handleSearchChange}
        />
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      </div>
      <div className={styles.userMenu} onClick={handleUserMenuClick}>
      <img src={session?.user?.image || '/path/to/profile-pic.jpg'} alt="Current User" className={styles.profilePic} />
        <span>User Menu</span>
        <FontAwesomeIcon className={styles.icon} icon={userMenuOpen ? faArrowUp : faArrowDown} />
        {userMenuOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <li><FontAwesomeIcon className={styles.icon} icon={faInfoCircle} /> Account Info</li>
              <li><FontAwesomeIcon className={styles.icon} icon={faBoxOpen} /> Orders</li>
              <li><FontAwesomeIcon className={styles.icon} icon={faStar} /> Recommendations</li>
              <li><FontAwesomeIcon className={styles.icon} icon={faHistory} /> Browsing History</li>
              <li><FontAwesomeIcon className={styles.icon} icon={faUserEdit} /> Manage Profiles</li>
              <li onClick={handleSignOut}><FontAwesomeIcon className={styles.icon} icon={faSignOutAlt} /> Sign Out</li>
            </ul>
          </div>
        )}
      </div>
      <div className={styles.cart} onClick={handleCartClick}>
        <FontAwesomeIcon className={styles.icon} icon={faShoppingCart} />
        <span>Cart ({cart.length})</span>
      </div>
    </header>
  );
};

export default Header;
