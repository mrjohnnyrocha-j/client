import React, { useState } from 'react';
import Stories from '../components/Stories/Stories';
import PicturePostsList from '../components/PicturePosts/PicturePostList/PicturePostList';
import FullScreenSection from '../components/General/FullScreenSection/FullScreenSection';
import Header from '@/PicturePosts/Header/Header';
import styles from '../styles/pictureposts/pictureposts.module.css';
import CollapseIcons from '../components/General/FullScreenSection/CollapseIcons/CollapseIcons';

const PicturePostsPage: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [showIcons, setShowIcons] = useState<boolean>(false);

  const handleExpand = () => {
    setExpanded(true);
    setClicked(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setClicked(false);
  };

  return (
    <div className={styles.picturePostsContainer}>
      <Header />

      <FullScreenSection
        id="pictureposts"
        title="Picture Posts"
        expanded={expanded}
        clicked={clicked}
        onExpand={handleExpand}
        onCollapse={handleCollapse}
        onClick={() => setClicked(true)}
        collapseSection={handleCollapse}
      >
        <PicturePostsList />
      </FullScreenSection>
      {showIcons && (
        <CollapseIcons
          onCollapse={handleCollapse}
          onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          section="pictureposts"
          onExpand={handleExpand}
        />
      )}
    </div>
  );
};

export default PicturePostsPage;
