import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import styles from './AuthProvider.module.css';

const LinkedInProvider: React.FC = () => {
  return (
    <button
      className={styles.button}
      onClick={() => signIn('linkedin')}
    >
      <Image src="/assets/linkedin.svg" alt="LinkedIn" width={20} height={20} priority />
      Sign in with LinkedIn
    </button>
  );
};

export default LinkedInProvider;
