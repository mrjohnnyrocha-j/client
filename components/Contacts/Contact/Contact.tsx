import React from 'react';
import { FaPhone, FaSms, FaDollarSign } from 'react-icons/fa';
import styles from './Contact.module.css';

interface ContactProps {
  contact: any;
  onCall: (contact: any) => void;
}

const Contact: React.FC<ContactProps> = ({ contact, onCall }) => {
  return (
    <div className={styles.contact}>
      <div className={styles.left}>
        <img src={contact.profile_pic} alt={contact.name} className={styles.avatar} />
        <div className={styles.details}>
          <h3 className={styles.name}>{contact.name}</h3>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.phone}>{contact.phone}</p>
        <div className={styles.actions}>
          <FaPhone onClick={() => onCall(contact)} />
          <FaSms />
          <FaDollarSign />
        </div>
      </div>
    </div>
  );
};

export default Contact;
