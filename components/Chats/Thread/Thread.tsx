import React, { useState, useEffect, useRef } from 'react';
import { FaThumbsUp, FaShare, FaTimes } from 'react-icons/fa';
import lottie from 'lottie-web';
import styles from './Thread.module.css';
import ShareWindow from '../ShareWindow/ShareWindow';

interface Message {
  id: number;
  type: string;
  content: string;
  likes: number;
  liked?: boolean;
  replies?: Message[];
}

interface ThreadProps {
  post: Message;
  onClose: () => void;
}

const Thread: React.FC<ThreadProps> = ({ post, onClose }) => {
  // const [replies, setReplies] = useState<Reply[]>(post.replies || []);
  const [replyContent, setReplyContent] = useState('');
  const [showShareWindow, setShowShareWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading && lottieContainerRef.current) {
      const animation = lottie.loadAnimation({
        container: lottieContainerRef.current,
        path: "/assets/loading.json",
        renderer: "svg",
        loop: true,
        autoplay: true,
      });

      return () => {
        animation.destroy();
      };
    }
  }, [isLoading]);

  const handleLikePost = () => {
    post.liked = !post.liked;
    post.liked ? post.likes++ : post.likes--;
    // Implement the API call to update likes on the server
  };

  const handleSharePost = () => {
    setShowShareWindow(true);
  };

  const handleLikeReply = (replyId: number) => {
    // setReplies(replies.map(reply =>
    //   reply.id === replyId ? { ...reply, liked: !reply.liked, likes: reply.liked ? reply.likes - 1 : reply.likes + 1 } : reply
    // ));
    // Implement the API call to update likes on the server
  };

  const handleShareReply = (replyId: number) => {
    setShowShareWindow(true);
  };

  const handleAddReply = async () => {
    if (!replyContent.trim()) return;

    setIsLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: replyContent }),
    });

    if (!response.ok) {
      console.error('Failed to add reply');
      setIsLoading(false);
      return;
    }

    const newReply = await response.json();
    // setReplies([...replies, { id: newReply.id, content: newReply.content, likes: 0, liked: false }]);
    setReplyContent('');
    setIsLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAddReply();
    }
  };

  const handleShareSubmit = (shareInput: string) => {
    // Implement the share functionality
    console.log(`Sharing message: ${post.content} with ${shareInput}`);
    setShowShareWindow(false);
  };

  return (
    <div className={styles.threadContainer}>
      <div className={styles.header}>
        <h2>Thread</h2>
        <FaTimes onClick={onClose} className={styles.closeButton} />
      </div>
      <div className={styles.postContent}>
        <p>{post.content}</p>
        <div className={styles.actions}>
          <FaThumbsUp onClick={handleLikePost} className={post.liked ? styles.liked : ''} />
          <FaShare onClick={handleSharePost} />
        </div>
      </div>
      {isLoading && <div id="lottie" ref={lottieContainerRef}></div>}
      <div className={styles.replies}>
        <ul className={styles.replyList}>
          {/* {replies.map(reply => (
            <li key={reply.id} className={styles.replyItem}>
              <div className={styles.replyContent}>{reply.content}</div>
              <div className={styles.replyActions}>
                <FaThumbsUp onClick={() => handleLikeReply(reply.id)} className={reply.liked ? styles.liked : ''} />
                <FaShare onClick={() => handleShareReply(reply.id)} />
                <span>{reply.likes} Likes</span>
              </div>
            </li>
          ))} */}
        </ul>
      </div>
      <div className={styles.newReply}>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a reply..."
          className={styles.newReplyInput}
        />
        <button onClick={handleAddReply} className={styles.newReplyButton}>Reply</button>
      </div>
      {showShareWindow && <ShareWindow message={post.content} onClose={() => setShowShareWindow(false)} onSubmit={handleShareSubmit} />}
    </div>
  );
};

export default Thread;
