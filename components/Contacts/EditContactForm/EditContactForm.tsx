// src/components/EditContactForm.tsx

import React, { useState } from 'react';
import styles from './EditContactForm.module.css';

interface EditContactFormProps {
  contact: any;
  onClose: () => void;
  onSave: (contact: any) => void;
}

const EditContactForm: React.FC<EditContactFormProps> = ({ contact, onClose, onSave }) => {
  const [updatedContact, setUpdatedContact] = useState(contact);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(updatedContact);
    onClose();
  };

  return (
    <div className={styles.formOverlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Edit Contact</h2>
        <label>
          Name:
          <input type="text" name="name" value={updatedContact.name} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={updatedContact.phone} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={updatedContact.email} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={updatedContact.address} onChange={handleChange} />
        </label>
        <label>
          Notes:
          <textarea name="notes" value={updatedContact.notes} onChange={handleChange} />
        </label>
        <div className={styles.buttons}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditContactForm;
