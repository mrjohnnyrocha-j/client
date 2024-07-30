import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "../../../context/CartContext";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faArrowDown, faArrowUp, faInfoCircle, faHistory, faSignOutAlt, faBoxOpen, faStar, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Image from "next/image";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { cart } = useCart();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleUserMenuClick = () => {
    setUserMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
           <div className={styles.logo} onClick={() => router.push('/')}>  
        <Image src="/assets/j_logo.png" alt="j Logo" width={26} height={108} />
        market
      </div>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search items..."
        onChange={handleSearchChange}
      />
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
              <li><FontAwesomeIcon className={styles.icon} icon={faSignOutAlt} /> Sign Out</li>
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
