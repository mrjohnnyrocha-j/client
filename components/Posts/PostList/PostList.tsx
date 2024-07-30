import React from 'react';
import { FaThumbsUp, FaReply, FaShare, FaCopy, FaRobot, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './PostList.module.css';

interface Post {
  id: string;
  content: string;
  userName: string;
  userProfilePic: string;
  createdAt: string;
  likes: number;
  views: number;
  replies: Reply[];
  postType: 'anonymous' | 'authenticated' | 'verified' | 'bot'; // New attribute
}

interface Reply {
  id: string;
  content: string;
}

interface PostListProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onReply: (postId: string) => void;
  onShare: (post: Post) => void;
  onPostClick: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts = [], onLike, onReply, onShare, onPostClick }) => {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      toast.success('Text copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy text.');
    });
  };

  const getPostIdentifier = (postType: string) => {
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
    <div className={styles.postList}>
      <ToastContainer />
      {posts.map(post => (
        <div key={post.id} className={styles.postItem} onClick={() => onPostClick(post.id)}>
          <div className={styles.postHeader}>
            <div className={styles.userInfo}>
              <img src={post.userProfilePic || '/default-profile.png'} alt={`${post.userName}'s profile`} className={styles.profilePic} />
              <span className={styles.userName}>{post.userName}</span>
              {getPostIdentifier(post.postType)}
            </div>
            <span className={styles.postDate}>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <div className={styles.postContent}>
            {post.content}
          </div>
          <div className={styles.postFooter}>
            <div className={styles.postActions}>
              <button onClick={(e) => { e.stopPropagation(); onLike(post.id); }} className={styles.actionButton}>
                <FaThumbsUp /> {post.likes}
              </button>
              <button onClick={(e) => { e.stopPropagation(); onReply(post.id); }} className={styles.actionButton}>
                <FaReply /> {post.replies?.length || 0} Replies
              </button>
              <button onClick={(e) => { e.stopPropagation(); onShare(post); }} className={styles.actionButton}>
                <FaShare /> {post.views}
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleCopy(post.content); }} className={styles.actionButton}>
                <FaCopy />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
