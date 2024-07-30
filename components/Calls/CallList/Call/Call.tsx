import React from 'react';
import { FaPhone, FaSms, FaDollarSign } from 'react-icons/fa';
import styles from './Call.module.css';

interface CallProps {
  call: any;
  onCall: (call: any) => void;
}

const Call: React.FC<CallProps> = ({ call, onCall }) => {
  return (
    <div className={styles.call}>
      <div className={styles.left}>
        <img src="/path/to/avatar.jpg" alt={call.name} className={styles.avatar} />
        <div>
          <h3 className={styles.name}>{call.name}</h3>
          <p className={styles.phone}>{call.phone}</p>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.time}>{new Date(call.callTime).toLocaleTimeString()}</p>
        <div className={styles.actions}>
          <FaPhone onClick={() => onCall(call)} />
          <FaSms />
          <FaDollarSign />
        </div>
      </div>
    </div>
  );
};

export default Call;
