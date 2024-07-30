import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaGripLinesVertical, FaComments } from 'react-icons/fa';
import ChatWindow from '../components/Chats/ChatWindow/ChatWindow';
import BrowserWindow from '../components/Browsers/BrowserWindow/BrowserWindow';
import TabsManager from '../components/General/Tabs/TabsManager/TabsManager';
import styles from '../styles/browsers.module.css';

const GenieLampAnimated = '/icons/genie-lamp-animated.svg';
const GenieLampStill = '/icons/genie-lamp-still.svg';
const JLogo = '/icons/j_logo.png';

const BrowsersPage: React.FC = () => {
  const router = useRouter();
  const { browserId, query } = router.query;
  const [browserWidth, setBrowserWidth] = useState<number>(50);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isGenieLampAnimated, setIsGenieLampAnimated] = useState<boolean>(true);
  const [tabs, setTabs] = useState<{ url: string, title: string }[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);

  if (!browserId || !query) {
    return <div>Loading...</div>;
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = browserWidth;

    const onMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const newBrowserWidth = Math.min(Math.max((startWidth + (e.clientX - startX) / containerWidth) * 100, 10), 90);
        setBrowserWidth(newBrowserWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleToggleGenieLamp = () => {
    setIsGenieLampAnimated(!isGenieLampAnimated);
  };

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIsGenieLampAnimated(true);
  };

  const handleUrlChange = (url: string) => {
    setTabs((prev) => {
      const newTabs = [...prev, { url, title: url }];
      return newTabs.length > 3 ? newTabs.slice(1) : newTabs;
    });
    setCurrentUrl(url);
  };

  const handleTabClick = (url: string) => {
    setCurrentUrl(url);
    setIsGenieLampAnimated(false);
  };

  const handleGoBack = () => {
    if (tabs.length > 1) {
      const newTabs = [...tabs];
      newTabs.pop();
      setTabs(newTabs);
      setCurrentUrl(newTabs[newTabs.length - 1].url);
    }
  };

  return (
    <div
      className={`${styles.container} ${
        isGenieLampAnimated ? styles.genieAnimated : styles.genieStill
      }`}
      ref={containerRef}
    >
      {isGenieLampAnimated ? (
        <>
          <div className={styles.browserWindow} style={{ flexBasis: '90%' }}>
            <BrowserWindow
              browserId={browserId as string}
              query={query as string}
              onToggleChat={handleToggleChat}
              onUrlChange={handleUrlChange}
              currentUrl={currentUrl}
              canGoBack={tabs.length > 1}
              onGoBack={handleGoBack}
            />
          </div>
          <div className={styles.sideBar} style={{ flexBasis: '10%' }}>
            <Image src={JLogo} alt="J Logo" width={26} height={108} />
            <FaComments className={styles.chatIcon} onClick={handleToggleChat} />
            <TabsManager tabs={tabs} onTabClick={handleTabClick} />
          </div>
        </>
      ) : (
        <>
          <div
            className={styles.browserWindow}
            style={{ flexBasis: `${isChatOpen ? browserWidth : 100}%` }}
          >
            <BrowserWindow
              browserId={browserId as string}
              query={query as string}
              onToggleChat={handleToggleChat}
              onUrlChange={handleUrlChange}
              currentUrl={currentUrl}
              canGoBack={tabs.length > 1}
              onGoBack={handleGoBack}
            />
          </div>
          {isChatOpen && (
            <>
              <div
                className={styles.resizer}
                onMouseDown={handleMouseDown}
                style={{ left: `${browserWidth}%` }}
              >
                <FaGripLinesVertical className={styles.resizerIcon} />
              </div>
              <div className={styles.chatWindow} style={{ flexBasis: `${100 - browserWidth}%` }}>
                <ChatWindow
                  chatId={browserId as string}
                  query={query as string}
                  type="chat"
                  onThread={() => {}}
                />
              </div>
            </>
          )}
        </>
      )}
      <div className={styles.genieLampContainer} onClick={handleToggleGenieLamp}>
        <img
          src={isGenieLampAnimated ? GenieLampAnimated : GenieLampStill}
          alt="Genie Lamp"
          className={styles.genieLampIcon}
        />
      </div>
    </div>
  );
};

export default BrowsersPage;
