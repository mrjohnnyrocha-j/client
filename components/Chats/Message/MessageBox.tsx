import React from 'react';
import Image from 'next/image';
import { FaThumbsUp, FaReply, FaShare, FaCopy, FaComments } from 'react-icons/fa';
import styles from './MessageBox.module.css';

interface Message {
  id: number;
  type: string;
  content: string;
  likes: number;
  liked?: boolean;
  replies?: Message[];
}

interface MessageProps {
  messages: Message[];
  onReply: (message: Message) => void;
  onShare: (message: Message) => void;
  onThread: (message: Message) => void;
  onCopy: (content: string | JSX.Element) => void;
  onLike: (messageId: number) => void;
}

const MessageBox: React.FC<MessageProps> = ({ messages, onReply, onShare, onThread, onCopy, onLike }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.map((msg) => {
        const messageClass = msg.type === 'user' ? styles.user : styles.j;
        return (
          <div key={msg.id} className={`${styles.message} ${messageClass}`}>
            {msg.type === 'j' && (
              <div className={styles.iconContainer}>
                <Image src='/assets/j_icon.png' alt="j Icon" width={20} height={20} className={styles.jIcon} />
              </div>
            )}
            {msg.type === 'user' && <b className={styles.userLabel}>YOU: </b>}
            {typeof msg.content === 'string' ? <p>{msg.content}</p> : msg.content}
            <div className={styles.actions}>
              <FaThumbsUp onClick={() => onLike(msg.id)} />
              <FaReply onClick={() => onReply(msg)} />
              <FaShare onClick={() => onShare(msg)} />
              <FaCopy onClick={() => onCopy(msg.content)} />
              <FaComments onClick={() => onThread(msg)} />
              <span className={styles.likeCount}>{msg.likes}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageBox;
