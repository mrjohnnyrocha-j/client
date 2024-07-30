import React from 'react';
import styles from './Background.module.css';
import Image from 'next/image';

const Background: React.FC = () => {
  return (
    <div className={styles.background}>
      {/* <div className={styles.logoContainer}>
        <Image
          src={"/assets/j_logo.png"}
          className={styles.logoImage}
          alt="Logo"
          width={52}
          height={52}
        />
      </div> */}
      {/* <div className={styles.neonText}>Welcome to the Future</div> */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={`${styles.organicShape} ${styles[`shape${index + 1}`]}`}></div>
      ))}
      
    </div>
  );
};

export default Background;
