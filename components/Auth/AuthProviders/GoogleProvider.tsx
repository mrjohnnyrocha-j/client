import { signIn } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import styles from './AuthProvider.module.css';


const GoogleProvider: React.FC = () => {
  return (
    <button onClick={() => signIn('google')} className={styles.button}>
      <Image src="/assets/google.svg" alt="Google" width={20} height={20} priority />
      Sign in with Google
    </button>
  );
};

export default GoogleProvider;
