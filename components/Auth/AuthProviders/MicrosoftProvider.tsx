import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import styles from './AuthProvider.module.css';

const MicrosoftProvider: React.FC = () => {
  return (
    <button
      className={styles.button}
      onClick={() => signIn('microsoft')}
    >
      <Image src="/assets/microsoft.svg" alt="Microsoft" width={20} height={20} priority  />
      Sign in with Microsoft
    </button>
  );
};

export default MicrosoftProvider;
