// pages/404.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/404.module.css';

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" legacyBehavior>
        <a className={styles.homeLink}>Go back to Home</a>
      </Link>
    </div>
  );
};

export default Custom404;
