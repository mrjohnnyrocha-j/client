import React from "react";
import { FaCompressAlt, FaArrowUp, FaExpandAlt } from "react-icons/fa";
import styles from "./CollapseIcons.module.css";

interface CollapseIconsProps {
  onCollapse: () => void;
  onScrollToTop: () => void;
  section: string;
  onExpand: () => void;
}

const CollapseIcons: React.FC<CollapseIconsProps> = ({ onCollapse, onScrollToTop, section, onExpand }) => {
  return (
    <div className={styles.icons}>
      <FaArrowUp onClick={onScrollToTop} className={styles.icon} />
      <FaExpandAlt onClick={onExpand} className={styles.icon} />
      <FaCompressAlt onClick={onCollapse} className={styles.icon} />
    </div>
  );
};

export default CollapseIcons;
