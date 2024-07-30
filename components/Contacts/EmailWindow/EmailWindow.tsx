import React, { useState } from 'react';
import styles from './EmailWindow.module.css';

interface EmailWindowProps {
  contact: any;
  onClose: () => void;
}

const EmailWindow: React.FC<EmailWindowProps> = ({ contact, onClose }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    // Handle the send email logic here
    console.log(`Sending email to ${contact.email} with subject "${subject}" and body "${body}"`);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Send Email</h2>
        <label>
          To:
          <input
            type="text"
            value={contact.email}
            disabled
          />
        </label>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <label>
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <div className={styles.actions}>
          <button onClick={handleSend}>Send</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EmailWindow;
