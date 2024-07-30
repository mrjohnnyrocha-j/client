import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import styles from './AuthProvider.module.css';

const GitHubProvider: React.FC = () => (
  <button onClick={() => signIn('github')} className={styles.button}>
    <Image src="/assets/github.svg" alt="GitHub" width={20} height={20} priority />
    Sign in with GitHub
  </button>
);

export default GitHubProvider;
