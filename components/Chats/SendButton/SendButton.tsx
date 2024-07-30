import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import styles from './SendButton.module.css';

interface SendButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.sendButton} onClick={onClick}>
      <FaPaperPlane />
    </button>
  );
};

export default SendButton;
