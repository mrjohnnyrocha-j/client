// context/PostContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

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

interface PostContextProps {
  posts: Post[];
  addPost: (newPost: Post) => void;
  setPosts: (posts: Post[]) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };
    loadPosts();
  }, []);

  const addPost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};
