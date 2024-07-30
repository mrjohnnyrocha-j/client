import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import axios from 'axios';
import { faHome, faFilm, faTv, faNewspaper, faList, faSearch, faBell, faUserCircle, faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/tv/tv.module.css';
import Header from '@/Tv/Header/Header';

const TVPage = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const handleSearch = (query: string) => {
    axios.get(`/api/search/tv?query=${query}`)
      .then(response => setFilteredItems(response.data))
      .catch(error => console.error('Error searching TV shows:', error));
  };
  
  return (
    <div className={styles.tvPage}>
      <Header onSearch={handleSearch}/>
      <div className={styles.content}>
        <div className={styles.trailer}>
          <div className={styles.trailerInfo}>
            <h2>Random TV Show</h2>
            <p className={styles.description}>A brief description of the TV show or movie...</p>
            <div className={styles.trailerActions}>
              <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
              <FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} />
            </div>
          </div>
          <video className={styles.trailerVideo} controls>
            <source src="path/to/trailer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles.continueWatching}>
          <h2>Continue Watching</h2>
          <div className={styles.scrollableList}>
            {/* Horizontal scrollable list of recently watched TV shows or movies */}
          </div>
        </div>
        <div className={styles.news}>
          <h2>News</h2>
          <div className={styles.scrollableList}>
            {/* Horizontal scrollable list of news */}
          </div>
        </div>
        <div className={styles.movies}>
          <h2>Movies</h2>
          <div className={styles.scrollableList}>
            {/* Horizontal scrollable list of movies */}
          </div>
        </div>
        <div className={styles.tvShows}>
          <h2>TV Shows</h2>
          <div className={styles.scrollableList}>
            {/* Horizontal scrollable list of TV shows */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVPage;
