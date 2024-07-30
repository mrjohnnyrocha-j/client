import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BrowserWindow from '../../components/Browsers/BrowserWindow/BrowserWindow';
import ChatWindow from '../../components/Chats/ChatWindow/ChatWindow';
import styles from '../../styles/browsers.module.css';

const BrowserInstance: React.FC = () => {
  const router = useRouter();
  const { browserId, query } = router.query;
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  const handleUrlChange = (url: string) => {
    setCurrentUrl(url);
    setCanGoBack(true);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  if (!browserId || !query) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <BrowserWindow
        browserId={browserId as string}
        query={query as string}
        onToggleChat={handleToggleChat}
        onUrlChange={handleUrlChange}
        currentUrl={currentUrl}
        canGoBack={canGoBack}
        onGoBack={handleGoBack}
      />
      {isChatOpen && (
        <ChatWindow chatId={browserId as string} query={query as string} type="chat" onThread={() => {}} />
      )}
    </div>
  );
};

export default BrowserInstance;
6