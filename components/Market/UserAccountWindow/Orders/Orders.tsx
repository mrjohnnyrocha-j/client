// components/Market/UserAccountWindow/Orders/Orders.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Order from '../../Order/Order';
import styles from './Orders.module.css';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders'); // Assuming endpoint to fetch orders
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className={styles.orders}>
      <h3>Orders</h3>
      {/* {orders.map(order => <Order key={order.id} order={order} />)} */}
    </div>
  );
};

export default Orders;
