import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import styles from './AuthProvider.module.css';

const MetaProvider: React.FC = () => {
  return (
    <button
      className={styles.button}
      onClick={() => signIn('facebook')}
    >
      <Image src="/assets/meta.svg" alt="Meta" width={20} height={20} priority />
      Sign in with Meta
    </button>
  );
};

export default MetaProvider;
