import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaRedo, FaSearch, FaBookmark, FaPlus, FaSave, FaFileExport, FaCog } from 'react-icons/fa';
import styles from './BrowserHeader.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface BrowserHeaderProps {
  onNavigate: (url: string) => void;
}

const BrowserHeader: React.FC<BrowserHeaderProps> = ({ onNavigate }) => {
  const [url, setUrl] = useState<string>('');
  const router = useRouter();

  const handleBack = () => {
    window.history.back();
  };

  const handleForward = () => {
    window.history.forward();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (url.trim()) {
      onNavigate(url.trim());
    }
  };

  return (
    <div className={styles.browserHeader}>
           <div className={styles.logo} onClick={() => router.push('/')}>  
        <Image src="/assets/j_logo.png" alt="j Logo" width={26} height={108} />
        browser
      </div>
      <button onClick={handleBack} className={styles.headerButton}><FaArrowLeft /></button>
      <button onClick={handleForward} className={styles.headerButton}><FaArrowRight /></button>
      <button onClick={handleRefresh} className={styles.headerButton}><FaRedo /></button>
      <button className={styles.headerButton}><FaBookmark /></button>
      <button className={styles.headerButton}><FaPlus /></button>
      <button className={styles.headerButton}><FaSave /></button>
      <button className={styles.headerButton}><FaFileExport /></button>
      <button className={styles.headerButton}><FaCog /></button>
      <form onSubmit={handleSearch} className={styles.urlForm}>
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Enter URL" 
          className={styles.urlInput} 
        />
        <button type="submit" className={styles.headerButton}><FaSearch /></button>
      </form>
    </div>
  );
};

export default BrowserHeader;
