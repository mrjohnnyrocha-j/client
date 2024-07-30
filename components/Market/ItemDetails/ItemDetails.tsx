import React from 'react';
import styles from './ItemDetails.module.css';

interface ItemDetailsProps {
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
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  return (
    <div className={styles.itemDetails}>
      <img src={item.image_url} alt={item.title} />
      <h1 className={styles.title}>{item.title}</h1>
      <p>{item.description}</p>
      <p>Size: {item.size}</p>
      <p>Color: {item.color}</p>
      <p>Rating: {item.rating}</p>
      <p>Price: ${item.price}</p>
      <p>Estimated Delivery: {new Date(item.estimated_delivery_date).toLocaleDateString()}</p>
      <p>Destination Delivery: {new Date(item.destination_delivery_date).toLocaleDateString()}</p>
      <p>Stock: {item.stock}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ItemDetails;
