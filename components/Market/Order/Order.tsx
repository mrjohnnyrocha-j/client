// components/Market/Order/Order.tsx
import React from 'react';
import styles from './Order.module.css';

interface OrderProps {
  order: {
    id: number;
    item_id: number;
    user_id: number;
    quantity: number;
    order_date: string;
    total_amount: number;
  };
}

const Order: React.FC<OrderProps> = ({ order }) => {
  return (
    <div className={styles.order}>
      <h3>Order #{order.id}</h3>
      <p>Item ID: {order.item_id}</p>
      <p>User ID: {order.user_id}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
      <p>Total Amount: ${order.total_amount}</p>
    </div>
  );
};

export default Order;
