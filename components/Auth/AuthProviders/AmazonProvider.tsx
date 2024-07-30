import { signIn } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import styles from './AuthProvider.module.css';


const AmazonProvider: React.FC = () => {
  return (
    <button onClick={() => signIn('amazon')} className={styles.button}>
      <Image src="/assets/amazon.svg" alt="Amazon" width={20} height={20} priority />
      Sign in with Amazon
    </button>
  );
};

export default AmazonProvider;
