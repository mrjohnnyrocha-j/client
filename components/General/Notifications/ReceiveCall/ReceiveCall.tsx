import React from 'react';
import styles from './ReceiveCall.module.css';

interface ReceiveCallProps {
  from: string;
  onAccept: () => void;
  onDecline: () => void;
}

const ReceiveCall: React.FC<ReceiveCallProps> = ({ from, onAccept, onDecline }) => {
  return (
    <div className={styles.receiveCallContainer}>
      <h2>Incoming call from {from}</h2>
      <div className={styles.buttons}>
        <button onClick={onAccept} className={styles.acceptButton}>Accept</button>
        <button onClick={onDecline} className={styles.declineButton}>Decline</button>
      </div>
    </div>
  );
};

export default ReceiveCall;
