import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '../../Item/Item';
import styles from './BrowsingHistory.module.css';
import { useSession } from 'next-auth/react';

const BrowsingHistory: React.FC = () => {
  const [history, setHistory] = useState([]);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get('/api/browsing-history', {
            params: { userId: user.id },
          });
          setHistory(response.data);
        } catch (error) {
          console.error('Error fetching browsing history:', error);
        }
      };
      fetchHistory();
    }
  }, [user]);

  return (
    <div className={styles.browsingHistory}>
      <h3>Browsing History</h3>
      <div className={styles.itemList}>
        {/* {history.map(({ item }) => (
          <Item key={item.id} item={item} onView={() => {}} />
        ))} */}
      </div>
    </div>
  );
};

export default BrowsingHistory;
