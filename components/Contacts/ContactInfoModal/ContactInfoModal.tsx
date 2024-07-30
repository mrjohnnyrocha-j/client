// src/components/ContactInfoModal.tsx

import React from 'react';
import styles from './ContactInfoModal.module.css';

interface ContactInfoModalProps {
  contact: any;
  onClose: () => void;
}

const ContactInfoModal: React.FC<ContactInfoModalProps> = ({ contact, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Contact Info</h2>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Address:</strong> {contact.address}</p>
        <p><strong>Notes:</strong> {contact.notes}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ContactInfoModal;
