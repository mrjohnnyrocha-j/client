import React, { useEffect, useState, ReactNode } from "react";
import CollapseIcons from "./CollapseIcons/CollapseIcons";
import styles from "./FullScreenSection.module.css";

interface FullScreenSectionProps {
  id: string;
  title: string;
  expanded: boolean;
  clicked: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onClick: () => void;
  collapseSection: () => void;
  children: ReactNode;
}

const FullScreenSection: React.FC<FullScreenSectionProps> = ({
  id,
  title,
  expanded,
  clicked,
  onExpand,
  onCollapse,
  onClick,
  collapseSection,
  children,
}) => {
  const [showIcons, setShowIcons] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScrollToTop = () => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop < lastScrollTop) {
        setShowIcons(true);
        setTimeout(() => setShowIcons(false), 3000);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        setShowIcons(true);
        setTimeout(() => setShowIcons(false), 3000);
      } else if (event.key === "Escape") {
        handleCollapse();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCollapse = () => {
    if (expanded) {
      collapseSection();
    } else {
      onCollapse();
    }
  };

  return (
    <div
      id={id}
      className={`${styles.section} ${expanded ? styles.expanded : ""}`}
      onDoubleClick={handleCollapse}
      onClick={onClick}
    >
      <h2>{title}</h2>
      {(expanded || clicked) && children}
      {(expanded || clicked) && showIcons && (
        <CollapseIcons
          onCollapse={handleCollapse}
          onScrollToTop={handleScrollToTop}
          section={id}
          onExpand={onExpand}
        />
      )}
    </div>
  );
};

export default FullScreenSection;
