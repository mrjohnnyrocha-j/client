import React from 'react';
import { useRouter } from 'next/router';
import Item from '../Item/Item';
import styles from './ItemList.module.css';

interface ItemListProps {
  items: any[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const router = useRouter();

  const handleViewItem = (id: number) => {
    router.push(`/item/${id}`);
  };

  return (
    <div className={styles.itemList}>
      {items.map((item) => (
        <Item key={item.id} item={item} onView={() => handleViewItem(item.id)} />
      ))}
    </div>
  );
};

export default ItemList;
