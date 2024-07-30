import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./AppContainer.module.css";
import Background from "../Background/Background";
import Stories from "../../Stories/Stories";
import { ChatProvider } from "../../../context/ChatContext";
import { PostProvider } from "../../../context/PostContext";
import VoiceModalHandler from "../VoiceModal/VoiceModalHandler/VoiceModalHandler";
import TabContentMapping from "../Tabs/TabContentMapping/TabContentMapping";
import DraggableContainer from "../DraggableContainer/DraggableContainer";
import { positionContainers } from "../../../utils/positionContainers";
import DynamicPage from "@/General/DynamicPage/DynamicPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faComment,
  faPhoneAlt,
  faCalendarAlt,
  faCloud,
  faGlobe,
  faVideoCamera,
  faMapMarkedAlt,
  faStore,
  faTv,
  faBank,
} from "@fortawesome/free-solid-svg-icons";
import VideosPage from "../../../pages/videos";

interface AppContainerProps {
  Component: React.ComponentType<any>;
  pageProps: any;
  activeTabs: string[];
  setActiveTabs: (tabs: string[]) => void;
}

const AppContainer: React.FC<AppContainerProps> = ({
  Component,
  pageProps,
  activeTabs,
  setActiveTabs,
}) => {
  const [containerPositions, setContainerPositions] = useState<
    { x: number; y: number; width: number; height: number; area: number }[]
  >([]);
  const [zIndices, setZIndices] = useState<number[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState<number>(0);

  const router = useRouter();
  const { query, pathname } = router;

  const tabIcons: Record<string, any> = {
    home: <FontAwesomeIcon icon={faHome} />,
    chats: <FontAwesomeIcon icon={faComment} />,
    calls: <FontAwesomeIcon icon={faPhoneAlt} />,
    calendar: <FontAwesomeIcon icon={faCalendarAlt} />,
    cloud: <FontAwesomeIcon icon={faCloud} />,
    community: <FontAwesomeIcon icon={faGlobe} />,
    videos: <FontAwesomeIcon icon={faVideoCamera} />,
    maps: <FontAwesomeIcon icon={faMapMarkedAlt} />,
    market: <FontAwesomeIcon icon={faStore} />,
    tv: <FontAwesomeIcon icon={faTv} />,
    bank: <FontAwesomeIcon icon={faBank} />,
  };

  useEffect(() => {
    const savedPositions = localStorage.getItem("containerPositions");
    const savedTabs = localStorage.getItem("activeTabs");
    if (savedPositions) {
      setContainerPositions(JSON.parse(savedPositions));
    }
    if (savedTabs) {
      setActiveTabs(JSON.parse(savedTabs));
    }
  }, [setActiveTabs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarWidth(window.innerWidth * 0.2);
    }
  }, []);

  const updatePositions = async (tabs: string[]) => {
    const positionsWithArea = containerPositions.map((pos) => ({
      ...pos,
      area: pos.width * pos.height,
    }));

    const newPositions = positionContainers(
      tabs,
      window.innerWidth,
      window.innerHeight,
      sidebarWidth,
      positionsWithArea
    );
    setContainerPositions(newPositions);
    localStorage.setItem("containerPositions", JSON.stringify(newPositions));
    localStorage.setItem("activeTabs", JSON.stringify(tabs));

    try {
      await fetch("/api/updateContainerPositions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ positions: newPositions, activeTabs: tabs }),
      });
    } catch (err) {
      console.error("Error updating container positions:", err);
    }
  };

  useEffect(() => {
    updatePositions(activeTabs);
  }, [activeTabs, sidebarWidth]);

  useEffect(() => {
    if (query.positions) {
      const positions = JSON.parse(query.positions as string);
      setContainerPositions(
        positions.map((pos: any) => ({
          ...pos,
          area: pos.width * pos.height,
        }))
      );
    }
  }, [query.positions]);

  useEffect(() => {
    const handleDynamicPage = () => {
      if (!activeTabs.includes(pathname)) {
        setActiveTabs([...activeTabs, pathname]);
      }
    };
    handleDynamicPage();
  }, [pathname, activeTabs, setActiveTabs]);

  const handleCloseTab = async (tab: string) => {
    const index = activeTabs.indexOf(tab);
    if (index !== -1) {
      const newActiveTabs = activeTabs.filter((t) => t !== tab);
      setActiveTabs(newActiveTabs);
      await updatePositions(newActiveTabs);
      const newZIndices = newActiveTabs.map((_, index) => index + 1);
      setZIndices(newZIndices);
    }
  };

  const handleContainerClick = (index: number) => {
    setZIndices((prevZIndices) => {
      const maxZIndex = Math.max(...prevZIndices);
      const newZIndices = [...prevZIndices];
      newZIndices[index] = maxZIndex + 1;
      return newZIndices;
    });
  };

  const renderDraggableContainers = () => {
    return activeTabs.map((tab, index) => {
      let TabContent;
      if (tab === "videos") {
        TabContent = VideosPage;
      } else if (
        tab.startsWith("/calls/") ||
        tab.startsWith("/chats/") ||
        tab.startsWith("/cloud/") ||
        tab.startsWith("/community/") ||
        tab.startsWith("/calendar/") ||
        tab.startsWith("/tv/") ||
        tab.startsWith("/home/") ||
        tab.startsWith("/market/") ||
        tab.startsWith("/maps/") ||
        tab.startsWith("/videos/") ||
        tab.startsWith("/tv/") ||
        tab.startsWith("/bank/") ||
        tab.startsWith("/settings/") ||
        tab.startsWith("/profile/") ||
        tab.startsWith("/tasks/") ||
        tab.startsWith("/pictureposts/") ||
        tab.startsWith("/cart/") ||
        tab.startsWith("/browsers/") 
      ) {
        TabContent = DynamicPage; // Handle dynamic routes
      } else {
        TabContent = TabContentMapping[tab] || Component;
      }
      const isOnlyTab = activeTabs.length === 1;

      return (
        <DraggableContainer
          key={tab}
          title={tab}
          icon={
            tabIcons[tab.split("/")[1]] || <FontAwesomeIcon icon={faHome} />
          }
          onClose={() => handleCloseTab(tab)}
          initialPosition={
            containerPositions[index] || {
              x: 0,
              y: 0,
              width: 300,
              height: 200,
              area: 60000,
            }
          }
          sidebarWidth={sidebarWidth}
          zIndex={zIndices[index] || index + 1}
          onClick={() => handleContainerClick(index)}
          showClose={!isOnlyTab}
        >
          <TabContent {...pageProps} />
        </DraggableContainer>
      );
    });
  };

  return (
    <div className={styles.appContainer}>
      <Background />
      <div className={styles.contentWrapper}>
        <div className={styles.storiesContainer}>
          <Stories />
        </div>
        <div className={styles.content}>
          <ChatProvider>
            <PostProvider>
              {renderDraggableContainers()}
              <VoiceModalHandler />
            </PostProvider>
          </ChatProvider>
        </div>
      </div>
    </div>
  );
};

export default AppContainer;
