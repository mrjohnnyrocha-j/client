import React from 'react';
import { FaThumbsUp, FaReply, FaShare } from 'react-icons/fa';
import styles from './Reply.module.css';

interface ReplyProps {
  content: string;
  onLike: () => void;
  onReply: () => void;
  onShare: () => void;
}

const Reply: React.FC<ReplyProps> = ({ content, onLike, onReply, onShare }) => {
  return (
    <div className={styles.reply}>
      <p>{content}</p>
      <div className={styles.actions}>
        <FaThumbsUp onClick={onLike} />
        <FaReply onClick={onReply} />
        <FaShare onClick={onShare} />
      </div>
    </div>
  );
};

export default Reply;
