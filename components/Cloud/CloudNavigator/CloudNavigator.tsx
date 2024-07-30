import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './CloudNavigator.module.css';

interface CloudNavigatorProps {
  onSelectCategory: (category: string, color: string) => void;
  customCategories: { name: string; color: string }[];
  onAddCategory: (category: string, color: string) => void;
  changeTheme: (color: string) => void;
}

const CloudNavigator: React.FC<CloudNavigatorProps> = ({ onSelectCategory, customCategories, onAddCategory, changeTheme }) => {
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#ffffff');
  const router = useRouter();

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryColor) {
      onAddCategory(newCategoryName, newCategoryColor);
      setShowModal(false);
      setNewCategoryName('');
      setNewCategoryColor('#ffffff');
    }
  };

  const handleCategoryClick = (category: string, color: string) => {
    onSelectCategory(category, color);
    changeTheme(color);
    router.push(`/cloud/${category}`);
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        <li onClick={() => handleCategoryClick('personal', '#FF6347')}>Personal</li>
        <li onClick={() => handleCategoryClick('professional', '#4682B4')}>Professional</li>
        {customCategories.map((category, index) => (
          <li key={index} style={{ color: category.color }} onClick={() => handleCategoryClick(category.name, category.color)}>
            {category.name}
          </li>
        ))}
      </ul>
      <FaPlus onClick={() => setShowModal(true)} className={styles.addButton} />
      {showModal && (
        <div className={styles.modal}>
          <h2>Add New Category</h2>
          <label>
            Category Name:
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </label>
          <label>
            Category Color:
            <input
              type="color"
              value={newCategoryColor}
              onChange={(e) => setNewCategoryColor(e.target.value)}
            />
          </label>
          <button onClick={handleAddCategory}>Add Category</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CloudNavigator;
