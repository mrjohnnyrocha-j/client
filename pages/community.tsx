import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import FullScreenSection from '../components/General/FullScreenSection/FullScreenSection';
import Header from '@/Posts/Header/Header';
import PostList from '../components/Posts/PostList/PostList';
import ShareWindow from '../components/Chats/ShareWindow/ShareWindow';
import { FaPaperPlane } from 'react-icons/fa';
import styles from '../styles/posts/community.module.css';
import { fetchData, postData } from '../utils/apiClient';
import { usePost } from '../context/PostContext';

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

const CommunityPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [clickedSection, setClickedSection] = useState<string | null>('posts');
  const { data: session } = useSession();
  const router = useRouter();
  const { posts, addPost, setPosts } = usePost(); // Use setPosts from context
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isShareWindowVisible, setIsShareWindowVisible] = useState<boolean>(false);
  const [sharePost, setSharePost] = useState<Post | null>(null);

  // Function to load posts from the database
  const loadMorePosts = useCallback(async () => {
    try {
      const data: Post[] = await fetchData('/api/posts');
      setPosts(data); // Set fetched posts to the state
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }, [setPosts]);

  // Use effect to load posts when component mounts
  useEffect(() => {
    loadMorePosts();
  }, [loadMorePosts]);

  const handleLike = async (postId: string) => {
    try {
      await postData(`/api/posts/${postId}/like`, {});
      // Update the local state accordingly if needed
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleReply = (postId: string) => {
    router.push(`/community/${postId}`);
  };

  const handleShare = (post: Post) => {
    setSharePost(post);
    setIsShareWindowVisible(true);
  };

  const handlePostClick = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  const handleNewPostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!session?.user) {
      console.error('User not authenticated');
      return;
    }

    try {
      const data = {
        user_id: session.user.id,
        content: newPostContent,
        user_name: `${session.user.name}`, // Ensure this matches your user model
        user_profile_pic: session.user.image,
        postType: 'authenticated' // Example post type, adjust as needed
      };
      const response: Post = await postData('/api/posts', data);
      addPost(response);
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating new post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = (section: string) => {
    setClickedSection(section);
  };

  const handleExpand = (section: string) => {
    setExpandedSection(section);
  };

  const handleCollapse = () => {
    setExpandedSection(null);
  };

  const handleShareWindowClose = () => {
    setIsShareWindowVisible(false);
    setSharePost(null);
  };

  const handleShareSubmit = (shareInput: string) => {
    console.log('Sharing post:', sharePost);
    console.log('With comment:', shareInput);
    handleShareWindowClose();
  };

  return (
    <div className={styles.communityContainer}>
      <Header />
      <div className={styles.newPostSection}>
        <form onSubmit={handleNewPostSubmit} className={styles.newPostForm}>
          <img src={session?.user?.image || '/path/to/profile-pic.jpg'} alt="Current User" className={styles.profilePic} />
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            required
            className={styles.newPostTextarea}
          />
          <button type="submit" className={styles.newPostButton} disabled={isSubmitting}>
            <FaPaperPlane />
          </button>
        </form>
      </div>
      <FullScreenSection
        id="posts"
        title="Posts"
        expanded={expandedSection === 'posts'}
        clicked={clickedSection === 'posts'}
        onExpand={() => handleExpand('posts')}
        onCollapse={handleCollapse}
        onClick={() => handleClick('posts')}
        collapseSection={handleCollapse}
      >
        <PostList posts={posts} onLike={handleLike} onReply={handleReply} onShare={handleShare} onPostClick={handlePostClick} />
      </FullScreenSection>
      {hasMore && (
        <button onClick={loadMorePosts} className={styles.loadMoreButton}>
          Load More
        </button>
      )}
      {isShareWindowVisible && sharePost && (
        <ShareWindow message={sharePost.content} onClose={handleShareWindowClose} onSubmit={handleShareSubmit} />
      )}
    </div>
  );
};

export default CommunityPage;