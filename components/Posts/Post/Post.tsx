import React from 'react';
import { FaEye, FaThumbsUp, FaRobot, FaCheckCircle } from 'react-icons/fa';
import styles from './Post.module.css';

interface PostProps {
  id: string;
  content: string;
  userName: string;
  userProfilePic: string;
  likes: number;
  views: number;
  postType: 'anonymous' | 'authenticated' | 'verified' | 'bot';
  onClick: () => void;
}

const Post: React.FC<PostProps> = ({ id, content, userName, userProfilePic, likes, views, postType, onClick }) => {
  const getPostIdentifier = () => {
    switch (postType) {
      case 'bot':
        return <FaRobot className={styles.botIcon} />;
      case 'verified':
        return <FaCheckCircle className={styles.verifiedIcon} />;
      case 'anonymous':
        return <span className={styles.anonymousTag}>Anonymous</span>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.postContainer} onClick={onClick}>
      <div className={styles.header}>
        <img src={userProfilePic} alt={`${userName} profile`} className={styles.profilePic} />
        <span className={styles.userName}>{userName}</span>
        {getPostIdentifier()}
      </div>
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>
        <div className={styles.likes}>
          <FaThumbsUp /> {likes}
        </div>
        <div className={styles.views}>
          <FaEye /> {views}
        </div>
      </div>
    </div>
  );
};

export default Post;
