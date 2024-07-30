import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';
import PicturePost from '../PicturePost/PicturePost';
import styles from './PicturePostList.module.css';

interface PicturePost {
  id: number;
  userId: string;
  userName: string;
  imageUrl: string;
  caption: string;
  description: string;
  likes: number;
  comments: { id: number; text: string }[];
}

const PicturePostList: React.FC = () => {
  const [picturePosts, setPicturePosts] = useState<PicturePost[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0);
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [saved, setSaved] = useState<{ [key: number]: boolean }>({});
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const pictureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const loadMorePictures = useCallback(async () => {
    try {
      const response = await axios.get('/api/picture-posts');
      setPicturePosts((prevPictures) => [...prevPictures, ...response.data]);
      if (response.data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading picture posts:', error);
    }
  }, []);

  useEffect(() => {
    loadMorePictures();
  }, [loadMorePictures]);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setCurrentPictureIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % picturePosts.length;
          scrollToPicture(nextIndex);
          return nextIndex;
        });
      }
    },
    [picturePosts.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      const delta = e.deltaY;
      if (delta < 0) {
        setCurrentPictureIndex((prevIndex) => {
          const nextIndex = prevIndex > 0 ? prevIndex - 1 : 0;
          scrollToPicture(nextIndex);
          return nextIndex;
        });
      } else if (delta > 0) {
        setCurrentPictureIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % picturePosts.length;
          scrollToPicture(nextIndex);
          return nextIndex;
        });
      }
    },
    [picturePosts.length]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [handleScroll]);

  const scrollToPicture = (index: number) => {
    const picture = pictureRefs.current[index];
    if (picture) {
      picture.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleLike = (id: number) => {
    setLiked({ ...liked, [id]: !liked[id] });
  };

  const handleSave = (id: number) => {
    setSaved({ ...saved, [id]: !saved[id] });
  };

  const handleAddComment = (id: number, comment: string) => {
    if (!comment.trim()) return;
    const postComments = comments[id] || [];
    setComments({ ...comments, [id]: [...postComments, comment] });
    setNewComment('');
  };

  return (
    <div className={styles.picturePost}>
      <ToastContainer />
      {picturePosts.map((picture, index) => (
        <div key={picture.id} className={styles.pictureItem} ref={(el) => { pictureRefs.current[index] = el; }}>
          <PicturePost
            id={picture.id}
            src={picture.imageUrl}
            caption={picture.caption}
            description={picture.description}
            likes={liked[picture.id] ? picture.likes + 1 : picture.likes}
            comments={picture.comments}
            liked={!!liked[picture.id]}
            saved={!!saved[picture.id]}
            onLike={() => handleLike(picture.id)}
            onSave={() => handleSave(picture.id)}
            newComment={newComment}
            setNewComment={setNewComment}
            onAddComment={(comment: string) => handleAddComment(picture.id, comment)}
          />
        </div>
      ))}
      {hasMore && (
        <button onClick={loadMorePictures} className={styles.loadMoreButton}>
          Load More
        </button>
      )}
    </div>
  );
};

export default PicturePostList;
