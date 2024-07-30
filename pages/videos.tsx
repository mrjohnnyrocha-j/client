// pages/videos.tsx
import React, { useState } from 'react';
import VideoUpload from '../components/Videos/VideoUpload/VideoUpload';
import FullScreenSection from '../components/General/FullScreenSection/FullScreenSection';
import CollapseIcons from '../components/General/FullScreenSection/CollapseIcons/CollapseIcons';
import VideoList from '../components/Videos/VideoList/VideoList';
import Header from '../components/Videos/Header/Header';
import styles from '../styles/videos/videos.module.css';
import axios from 'axios';

const VideosPage: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(true);
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleExpand = () => {
    setExpanded(true);
    setClicked(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setClicked(false);
  };

  const handleSearch = (query: string) => {
    axios.get(`/api/search/videos?query=${query}`)
      .then(response => setFilteredItems(response.data))
      .catch(error => console.error('Error searching videos:', error));
  };


  const scrollToVideo = (index: number) => {
    const videoElement = document.querySelector(`video[data-index='${index}']`);
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.videoContainer}>
      <Header />
      <VideoUpload />
      <FullScreenSection
        id="videos"
        title="Videos"
        expanded={expanded}
        clicked={clicked}
        onExpand={handleExpand}
        onCollapse={handleCollapse}
        onClick={() => setClicked(true)}
        collapseSection={handleCollapse}
      >
        <VideoList />
      </FullScreenSection>
      {showIcons && (
        <CollapseIcons
          onCollapse={handleCollapse}
          onScrollToTop={() => scrollToVideo(0)}
          section="videos"
          onExpand={handleExpand}
        />
      )}
    </div>
  );
};

export default VideosPage;
