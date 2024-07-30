import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCart, CartItem } from '../../../context/CartContext';
import styles from './Item.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

interface ItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    size: string;
    color: string;
    rating: number;
    price: number;
    estimated_delivery_date: string;
    destination_delivery_date: string;
    stock: number;
    image_url: string;
  };
  onView: () => void;
}

const Item: React.FC<ItemProps> = ({ item, onView }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = async () => {
    const cartItem: CartItem = {
      ...item,
      quantity: 1,
    };
    addToCart(cartItem);

    // Save to database
    try {
      await axios.post('/api/cart', { ...cartItem, userId: "user-id-placeholder" }); // Replace with actual user ID
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className={styles.item}>
      <img src={item.image_url} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <button className={styles.viewButton} onClick={onView}>
        <FontAwesomeIcon icon={faEdit} /> View Details
      </button>
      <button className={styles.cartButton} onClick={handleAddToCart}>
        <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
      </button>
    </div>
  );
};

export default Item;
