import React from 'react';
import styles from './EmojiWindow.module.css';

interface EmojiWindowProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const emojis = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎"];

const EmojiWindow: React.FC<EmojiWindowProps> = ({ onSelect, onClose }) => {
  return (
    <div className={styles.emojiWindow}>
      <button className={styles.closeButton} onClick={onClose}>x</button>
      <div className={styles.emojiList}>
        {emojis.map((emoji, index) => (
          <span key={index} onClick={() => onSelect(emoji)} className={styles.emoji}>
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmojiWindow;
