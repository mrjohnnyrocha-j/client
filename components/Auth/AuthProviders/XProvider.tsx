import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import styles from './AuthProvider.module.css';

const XProvider: React.FC = () => {
  return (
    <button
      className={styles.button}
      onClick={() => signIn('x')}
    >
      <Image src="/assets/x.svg" alt="x" width={20} height={20} priority/>
      Sign in with X
    </button>
  );
};

export default XProvider;
