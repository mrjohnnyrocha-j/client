import React from 'react';
import styles from './SearchResult.module.css';

interface SearchResultProps {
  result: {
    url: string;
    title: string;
    publishedDate: string;
    lastEditedDate: string;
    contentPreview: string;
  };
  onClick: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ result, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
    window.open(result.url, '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
      window.open(result.url, '_blank');
    }
  };

  return (
    <div
      className={styles.resultCard}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyPress={handleKeyPress}
    >
      <div className={styles.resultHeader}>
        <a href={result.url} target="_blank" rel="noopener noreferrer" className={styles.title}>
          {result.title}
        </a>
      </div>
      <div className={styles.resultDetails}>
        <p className={styles.contentPreview}>{result.contentPreview}</p>
        <p className={styles.url}>{result.url}</p>
        <p className={styles.dates}>
          Published: {result.publishedDate} | Last Edited: {result.lastEditedDate}
        </p>
      </div>
    </div>
  );
};

export default SearchResult;
