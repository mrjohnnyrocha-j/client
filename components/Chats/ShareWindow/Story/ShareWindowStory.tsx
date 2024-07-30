import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './ShareWindowStory.module.css';

interface ShareWindowStoryProps {
  message: string;
  onClose: () => void;
  onSubmit: (shareInput: string) => void;
}

const ShareWindowStory: React.FC<ShareWindowStoryProps> = ({ message, onClose, onSubmit }) => {
  const [shareInput, setShareInput] = useState<string>('');
  const users = ['user1@example.com', 'user2@example.com', 'user3@example.com']; // Replace with your list of known users

  const handleShare = () => {
    onSubmit(shareInput);
  };

  return (
    <div className={styles.shareWindow}>
      <div className={styles.header}>
        <h2>Share Story</h2>
        <FaTimes onClick={onClose} className={styles.closeIcon} />
      </div>
      <div className={styles.content}>
        <div className={styles.message}>
          {message}
        </div>
        <select
          className={styles.shareInput}
          value={shareInput}
          onChange={(e) => setShareInput(e.target.value)}
        >
          <option value="" disabled>Select a user</option>
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
        <button className={styles.shareButton} onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

export default ShareWindowStory;
