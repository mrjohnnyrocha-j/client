import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import PicturePost from '../components/PicturePosts/PicturePost/PicturePost';
import PostList from '../components/Posts/PostList/PostList';
import VideoList from '../components/Videos/VideoList/VideoList';
import FullScreenSection from '../components/General/FullScreenSection/FullScreenSection';
import styles from '../styles/home/home.module.css';
import Header from '../components/Home/Header/Header';
import PicturePostList from '@/PicturePosts/PicturePostList/PicturePostList';

interface Post {
  id: string;
  content: string;
  userName: string;
  userProfilePic: string;
  createdAt: string;
  likes: number;
  views: number;
  replies: Reply[];
  postType: 'anonymous' | 'authenticated' | 'verified' | 'bot'; 
}

const HomePage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [clickedSection, setClickedSection] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadMorePosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error loading posts');
      setLoading(false);
      console.error('Error loading posts:', error);
    }
  }, []);

  useEffect(() => {
    loadMorePosts();
  }, [loadMorePosts]);

  const handleClick = (section: string) => {
    setClickedSection(section);
  };

  const handleExpand = (section: string) => {
    setExpandedSection(section);
  };

  const handleCollapse = () => {
    setExpandedSection(null);
  };

  const handleLike = async (postId: string) => { 
    try {
      await axios.post(`/api/posts/${postId}/like`);
      setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    } catch (error) {
      setError('Error liking post');
      console.error('Error liking post:', error);
    }
  };

  const handleReply = (postId: string) => { 
    router.push(`/community/${postId}`);
  };

  const handleShare = (post: Post) => {
    alert('Share functionality is not implemented yet.');
  };

  const handlePostClick = (postId: string) => { 
    router.push(`/posts/${postId}`);
  };

  const handleSearch = (query: string) => {
    axios.get(`/api/search/posts?query=${query}`)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error searching posts:', error));
  };
  

  return (
    <div className={styles.homeContainer}>
       <Header onSearch={handleSearch} />
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <div className={styles.scrollContainer}>
            {error && <p className={styles.error}>{error}</p>}
            <FullScreenSection
              id="pictureposts"
              title="Picture Posts"
              expanded={expandedSection === 'pictureposts'}
              clicked={clickedSection === 'pictureposts'}
              onExpand={() => handleExpand('pictureposts')}
              onCollapse={handleCollapse}
              onClick={() => handleClick('pictureposts')}
              collapseSection={handleCollapse}
            >
              <PicturePostList/>
            </FullScreenSection>
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
              <PostList
                posts={posts}
                onLike={handleLike}
                onReply={handleReply}
                onShare={handleShare}
                onPostClick={handlePostClick}
              />
            </FullScreenSection>
            <FullScreenSection
              id="videos"
              title="Videos"
              expanded={expandedSection === 'videos'}
              clicked={clickedSection === 'videos'}
              onExpand={() => handleExpand('videos')}
              onCollapse={handleCollapse}
              onClick={() => handleClick('videos')}
              collapseSection={handleCollapse}
            >
              <VideoList />
            </FullScreenSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
