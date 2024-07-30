import React from 'react';
import { useVoiceModal } from '../../../context/VoiceModalContext';
import styles from './MicrophoneButton.module.css';

const MicrophoneButton: React.FC = () => {
  const { openModal } = useVoiceModal();

  return (
    <div className={styles.button} onClick={openModal}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={styles.icon}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v12m8-7h-8m0 8h8m0 0H4m0 0h8m0 0H4m0 0h8" />
      </svg>
    </div>
  );
};

export default MicrophoneButton;
