import React from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faCreditCard,
  faLifeRing,
  faUserCircle,
  faSearch,
  faDollarSign,
  faExchangeAlt,
  faPlusCircle,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import Header from "@/Bank/Header/Header";
import styles from "../styles/bank/index.module.css";

const BankPage = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const handleSearch = (query: string) => {
    axios
      .get(`/api/search/tv?query=${query}`)
      .then((response) => setFilteredItems(response.data))
      .catch((error) => console.error("Error searching TV shows:", error));
  };
  return (
    <div className={styles.bankPage}>
      <Header onSearch={handleSearch} />
      <div className={styles.content}>
        <div className={styles.homeContent}>
          <div className={styles.topBar}>
            <FontAwesomeIcon
              icon={faUserCircle}
              className={styles.profileIcon}
            />
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchBar}
            />
            <FontAwesomeIcon icon={faChartLine} className={styles.statsIcon} />
            <FontAwesomeIcon icon={faCreditCard} className={styles.cardsIcon} />
          </div>
          <div className={styles.mainAccount}>
            <h2>Main Account</h2>
            <p className={styles.balance}>$12,345.67</p>
            <div className={styles.accountActions}>
              <FontAwesomeIcon icon={faDollarSign} />
              <FontAwesomeIcon icon={faExchangeAlt} />
              <FontAwesomeIcon icon={faPlusCircle} />
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
          </div>
          <div className={styles.draggableSections}>
            {/* Draggable sections for last movement, widgets, graphs, etc. */}
          </div>
        </div>
        <div className={styles.underConstruction}>
          <p>Under construction...</p>
        </div>
      </div>
    </div>
  );
};

export default BankPage;
