// LowerSideBar.tsx
import React from "react";
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
import styles from "./LowerSideBar.module.css";

interface LowerSideBarProps {
  onSelectTab: (tab: string) => void;
  activeTabs: string[];
}

const LowerSideBar: React.FC<LowerSideBarProps> = ({
  onSelectTab,
  activeTabs,
}) => {
  const tabs = [
    { name: "home", icon: faHome, color: "#FFD700" },
    { name: "chats", icon: faComment, color: "#ADFF2F" },
    { name: "calls", icon: faPhoneAlt, color: "#00FFFF" },
    { name: "calendar", icon: faCalendarAlt, color: "#FF4500" },
    { name: "cloud", icon: faCloud, color: "#1E90FF" },
    { name: "community", icon: faGlobe, color: "#BD6287" },
    { name: "videos", icon: faVideoCamera, color: "#FF69B4" },
    { name: "maps", icon: faMapMarkedAlt, color: "#00FF00" },
    { name: "market", icon: faStore, color: "#FFA500" },
    { name: "tv", icon: faTv, color: "#FBA500" },
    { name: "bank", icon: faBank, color: "#D3D3D3" },
  ];

  return (
    <div className={styles.sidebar}>
      {tabs.map((tab) => (
        <a
          key={tab.name}
          className={`${styles.sidebarItem} ${activeTabs.includes(tab.name) ? styles.active : ""}`}
          style={{
            backgroundColor: activeTabs.includes(tab.name) ? tab.color : "",
          }}
          onClick={() => onSelectTab(tab.name)}
        >
          <FontAwesomeIcon icon={tab.icon} className={styles.tabIcon} />
          <span className={styles.itemText}>
            {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
          </span>
        </a>
      ))}
    </div>
  );
};

export default LowerSideBar;
