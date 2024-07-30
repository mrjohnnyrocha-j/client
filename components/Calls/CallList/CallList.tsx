import React from 'react';
import Call from './Call/Call';
import { FaPlus, FaPhone } from 'react-icons/fa';
import styles from './CallList.module.css';

interface CallListProps {
  calls: any[];
  onAddCall: () => void;
  onCall: (call: any) => void;
}

const CallList: React.FC<CallListProps> = ({ calls, onAddCall, onCall }) => {
  return (
    <div className={styles.callList}>
      {calls.map((call) => (
        <Call key={call.id} call={call} onCall={onCall} />
      ))}
      <div className={styles.addButton} onClick={onAddCall}>
        <FaPhone />
      </div>
    </div>
  );
};

export default CallList;
