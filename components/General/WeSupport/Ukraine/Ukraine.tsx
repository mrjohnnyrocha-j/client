import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaTimes,
  FaHeart,
  FaHandHoldingHeart,
  FaRegHandPeace,
  FaGlobe,
} from "react-icons/fa";
import styles from "./Ukraine.module.css";

const SupportUkraine: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible || !hydrated) return null;

  return (
    <div className={styles.supportContainer}>
      <button className={styles.closeButton} onClick={handleClose}>
        <FaTimes />
      </button>
      <div className={styles.message}>
        <Image
          src="/assets/ukraine.svg"
          alt="Ukraine Armed Forces"
          width={30}
          height={30}
          className={styles.logo}
        />
        <span className={styles.mainText}>
          <span className={styles.ukraineBlue}>We stand with </span><span className={styles.ukraineYellow}>UKR<span className={styles.aine}>AINE</span></span>
        </span>
        <Image
          src="/assets/ukraine_borders.svg"
          alt="Ukraine Legitimate Borders"
          width={30}
          height={30}
          className={styles.logo}
        />
        <div className={styles.mottoContainer}>
          <span className={styles.mottoTheme}>Слава Україні!</span>
          <span className={styles.mottoTheme}>Героям слава!</span>
        </div>
        
      </div>
      <div className={styles.donationLinks}>
        <a
          href="https://donate.redcross.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaHeart />
          <span>Red Cross</span>
        </a>
        <a
          href="https://www.unicef.org/donate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaHandHoldingHeart />
          <span>UNICEF</span>
        </a>
        <a
          href="https://www.savethechildren.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaRegHandPeace />
          <span>Save the Children</span>
        </a>
        <a
          href="https://www.globalgiving.org/projects/ukraine-crisis-relief-fund/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGlobe />
          <span>Global Giving</span>
        </a>
      </div>
    </div>
  );
};

export default SupportUkraine;
