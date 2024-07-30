import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styles from './VideoList.module.css';

interface Video {
  id: string;
  userId: string;
  videoUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    likes: number;
    views: number;
    shares: number;
  };
}

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const loadVideos = async () => {
    try {
      const response = await axios.get('/api/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const scrollToVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setCurrentVideoIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % videos.length;
          scrollToVideo(nextIndex);
          return nextIndex;
        });
      }
    },
    [videos.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setCurrentVideoIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.setAttribute('data-index', index.toString());
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentVideoIndex]);

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoWrapper}>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <video
              key={video.id}
              src={video.videoUrl}
              controls
              className={styles.videoPlayer}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              autoPlay={index === currentVideoIndex}
            />
          ))
        ) : (
          <p>Loading videos...</p>
        )}
      </div>
    </div>
  );
};

export default VideoList;
