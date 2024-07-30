import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '../../Item/Item';
import styles from './Watchlists.module.css';

const Watchlists: React.FC = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get('/api/watchlists');
        setWatchlistItems(response.data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
    fetchWatchlist();
  }, []);

  const handleCreateWatchlist = async () => {
    try {
      const response = await axios.post('/api/watchlists', { name: newWatchlistName });
      // setWatchlistItems([...watchlistItems, response.data]);
      setShowModal(false);
      setNewWatchlistName('');
    } catch (error) {
      console.error('Error creating watchlist:', error);
    }
  };

  return (
    <div className={styles.watchlists}>
      <h3>Watchlists</h3>
      <button onClick={() => setShowModal(true)}>Create Watchlist</button>
      {/* <div className={styles.itemList}>
        {watchlistItems.map(item => <Item key={item.id} item={item} onView={() => {}} />)}
      </div> */}
      {showModal && (
        <div className={styles.modal}>
          <h4>Create Watchlist</h4>
          <input
            type="text"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            placeholder="Watchlist Name"
          />
          <button onClick={handleCreateWatchlist}>Create</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Watchlists;
