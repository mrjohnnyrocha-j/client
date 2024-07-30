// /components/UserInputWindow/UserInputWindow.tsx

import React from 'react';
import styles from './UserInputWindow.module.css';

interface UserInputWindowProps {
  onUpload: (file: File) => void;
  onClose: () => void;
}

const UserInputWindow: React.FC<UserInputWindowProps> = ({ onUpload, onClose }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className={styles.userInputWindow}>
      <button className={styles.closeButton} onClick={onClose}>x</button>
      <input type="file" onChange={handleFileChange} className={styles.fileInput} />
    </div>
  );
};

export default UserInputWindow;

