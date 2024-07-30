import React from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';
import styles from './PicturePost.module.css';

interface PicturePostProps {
  id: number;
  src: string;
  caption: string;
  description: string;
  likes: number;
  comments: { id: number; text: string }[];
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onSave: () => void;
  onAddComment: (comment: string) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
}

const PicturePost: React.FC<PicturePostProps> = ({
  id,
  src,
  caption,
  description,
  likes,
  comments = [], // Provide a default empty array
  liked,
  saved,
  onLike,
  onSave,
  onAddComment,
  newComment,
  setNewComment,
}) => {
  return (
    <div className={styles.pictureItem}>
      <div className={styles.pictureWrapper}>

        <img src={src} alt={caption} className={styles.pictureImage} />
        <div className={styles.actions}>
          <FaHeart
            className={`${styles.icon} ${liked ? styles.liked : ''}`}
            onClick={onLike}
          />
          <FaComment className={styles.icon} />
          <FaShare className={styles.icon} />
          <FaBookmark
            className={`${styles.icon} ${saved ? styles.saved : ''}`}
            onClick={onSave}
          />
        </div>
      </div>
      <div className={styles.caption}>{caption}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.likes}>{likes} likes</div>
      <div className={styles.comments}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            {comment.text}
          </div>
        ))}
        <input
          type="text"
          className={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onAddComment(newComment);
            }
          }}
        />
      </div>
    </div>
  );
};

export default PicturePost;
