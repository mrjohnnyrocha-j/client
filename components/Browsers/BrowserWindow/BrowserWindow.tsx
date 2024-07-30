import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchResult from '../SearchResult/SearchResult';
import BrowserHeader from '../BrowserHeader/BrowserHeader';
import { search, SearchResult as SearchResultType } from '../../../services/searchService';
import styles from './BrowserWindow.module.css';
import { FaRobot, FaComments, FaArrowLeft } from 'react-icons/fa';

interface BrowserWindowProps {
  browserId: string;
  query: string;
  onToggleChat: (contactId: string) => void;
  onUrlChange: (url: string) => void;
  currentUrl: string;
  canGoBack: boolean;
  onGoBack: () => void;
}

const BrowserWindow: React.FC<BrowserWindowProps> = ({
  browserId,
  query,
  onToggleChat,
  onUrlChange,
  currentUrl,
  canGoBack,
  onGoBack,
}) => {
  const [results, setResults] = useState<SearchResultType[]>([]);
  const [error, setError] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const searchResults = await search(query);
        setResults(searchResults);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results.');
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleSearchNavigate = (url: string) => {
    onUrlChange(url);
  };

  const handleResultClick = (result: SearchResultType) => {
    onUrlChange(result.url);
  };

  const handleIframeNavigation = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;

    const newUrl = event.data;
    if (newUrl && typeof newUrl === 'string') {
      onUrlChange(newUrl);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleIframeNavigation);
    return () => {
      window.removeEventListener('message', handleIframeNavigation);
    };
  }, []);

  return (
    <div className={styles.browserWindow}>
      <BrowserHeader onNavigate={handleSearchNavigate} />
      <h2>Search Results for: {query}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.results}>
        {results.map((result, index) => (
          <div
            key={result.url}
            className={styles.resultItem}
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => handleResultClick(result)}
          >
            <SearchResult 
              result={{
                url: result.url,
                title: result.title,
                publishedDate: result.publishedDate,
                lastEditedDate: result.lastEditedDate,
                contentPreview: result.subtitle
              }} 
              onClick={() => handleResultClick(result)}
            />
          </div>
        ))}
        <div className={styles.resultItem} style={{ animationDelay: `${results.length * 0.2}s` }}>
          <div className={styles.aiResult}>
            <FaRobot className={styles.aiIcon} />
            <p>This is an AI-generated answer to your query.</p>
            <button className={styles.chatButton} onClick={() => onToggleChat(browserId)}>
              <FaComments /> Open Chat
            </button>
          </div>
        </div>
      </div>
      {currentUrl && (
        <div className={styles.iframeContainer}>
          {canGoBack && (
            <button className={styles.goBackButton} onClick={onGoBack}>
              <FaArrowLeft />
            </button>
          )}
          <iframe
            ref={iframeRef}
            src={currentUrl}
            className={styles.pageContent}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      )}
    </div>
  );
};

export default BrowserWindow;
