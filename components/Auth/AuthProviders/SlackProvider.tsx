import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import styles from './AuthProvider.module.css';

const SlackProvider: React.FC = () => {
  return (
    <button
      className={styles.button}
      onClick={() => signIn('slack')}
    >
      <Image src="/assets/slack.svg" alt="Slack" width={20} height={20} priority />
      Sign in with Slack
    </button>
  );
};

export default SlackProvider;
