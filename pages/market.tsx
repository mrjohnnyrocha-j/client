import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Market/Header/Header';
import ItemList from '../components/Market/ItemList/ItemList';
import UserAccountWindow from '../components/Market/UserAccountWindow/UserAccountWindow';
import { CartProvider } from '../context/CartContext';
import styles from '../styles/market/market.module.css';

const MarketPage: React.FC = () => {
  const [userType, setUserType] = useState<'seller' | 'vendor'>('seller');
  const [offers, setOffers] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offersResponse = await axios.get('/api/items');
        setOffers(offersResponse.data);
        setFilteredItems(offersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userType]);

  const handleToggleUserType = () => {
    setUserType((prevType) => (prevType === 'seller' ? 'vendor' : 'seller'));
  };

  const handleSearch = (query: string) => {
    const data = userType === 'seller' ? offers : salesData;
    const filtered = data.filter((item: { title: string }) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  

  return (
    <CartProvider>
      <div className={styles.container}>
        <Header onSearch={handleSearch} />
        <button className={styles.button} onClick={handleToggleUserType}>
          Switch to {userType === 'seller' ? 'Vendor' : 'Seller'} View
        </button>
        <UserAccountWindow />
        {userType === 'seller' ? (
          <div className={styles.offers}>
            <h2 className={styles.h2}>Latest Offers</h2>
            <ItemList items={filteredItems} />
          </div>
        ) : (
          <div className={styles.dashboard}>
            <h2 className={styles.h2}>Vendor Dashboard</h2>
            <div className={styles.salesData}>
              <h3 className={styles.h3}>Sales Data</h3>
              <ItemList items={filteredItems} />
            </div>
          </div>
        )}
      </div>
    </CartProvider>
  );
};

export default MarketPage;
