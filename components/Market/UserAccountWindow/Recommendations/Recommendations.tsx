import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Item from '../../Item/Item';
import styles from './Recommendations.module.css';

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`/api/recommendations?userId=${user.id}`);
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [user]);

  return (
    <div className={styles.recommendations}>
      <h3>Recommendations</h3>
      <div className={styles.itemList}>
        {/* {recommendations.map(item => <Item key={item.id} item={item} onView={() => {}} />)} */}
      </div>
    </div>
  );
};

export default Recommendations;
