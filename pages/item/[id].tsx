import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../components/Market/Item/Item.module.css';
import { useSession } from 'next-auth/react';

const ItemPage: React.FC = () => {
  const [item, setItem] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`/api/items/${id}`);
          setItem(response.data);

          // Add to browsing history
          if (user) {
            await axios.post('/api/browsing-history', { userId: user.id, itemId: id });
          }
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      };
      fetchItem();
    }
  }, [id, user]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.item}>
      {/* <img src={item.image_url} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <p>Size: {item.size}</p>
      <p>Color: {item.color}</p>
      <p>Rating: {item.rating}</p>
      <p>Estimated Delivery: {new Date(item.estimated_delivery_date).toLocaleDateString()}</p>
      <p>Destination Delivery: {new Date(item.destination_delivery_date).toLocaleDateString()}</p>
      <p>Stock: {item.stock}</p> */}
    </div>
  );
};

export default ItemPage;
