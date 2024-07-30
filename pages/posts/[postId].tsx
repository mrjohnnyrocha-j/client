// pages/posts/[postId].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/Posts/Header/Header';
import Post from '@/Posts/Post/Post';
import Reply from '@/Chats/Reply/Reply';
import styles from '../../styles/posts/posts.module.css';

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
  id:       string ; 
  postId:    string;
  userId:    string;
  content:   string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  post: Post[];
}

interface PostPageProps {
  post: Post;
  reply: Reply;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { postId } = router.query as { postId: string };

  const [replies, setReplies] = useState<Reply[]>(post.replies);
  const [newReplyContent, setNewReplyContent] = useState<string>('');

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      console.error('User not authenticated');
      return;
    }
    try {
      const response = await axios.post(`/api/posts/${postId}/replies`, {
        content: newReplyContent,
        userId: session.user.id,
      });
      setReplies([...replies, response.data]);
      setNewReplyContent('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleLike = async (replyId: string) => {
    try {
      await axios.post(`/api/replies/${replyId}/like`);
      setReplies(replies.map(reply =>
        reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
      ));
    } catch (error) {
      console.error('Error liking reply:', error);
    }
  };

  const handleReplyAction = (replyId: string, action: 'like' | 'reply' | 'share') => {
    switch (action) {
      case 'like':
        handleLike(replyId);
        break;
      case 'reply':
        // Implement reply to reply logic
        break;
      case 'share':
        // Implement share reply logic
        break;
    }
  };

  return (
    <div className={styles.postContainer}>
      <Header />
      <Post
        id={post.id}
        content={post.content}
        userName={post.userName}
        userProfilePic={post.userProfilePic}
        likes={post.likes}
        views={post.views}
        postType={post.postType}
        onClick={() => {}}
      />
      <div className={styles.repliesContainer}>
        <h2>Replies</h2>
        {replies.map(reply => (
          <Reply
            key={reply.id}
            content={reply.content}
            onLike={() => handleReplyAction(reply.id, 'like')}
            onReply={() => handleReplyAction(reply.id, 'reply')}
            onShare={() => handleReplyAction(reply.id, 'share')}
          />
        ))}
        <form onSubmit={handleReplySubmit}>
          <textarea
            value={newReplyContent}
            onChange={(e) => setNewReplyContent(e.target.value)}
            placeholder="Write a reply..."
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.params as { postId: string };

  try {
    const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);
    return {
      props: { post: response.data },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default PostPage;
